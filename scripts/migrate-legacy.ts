/*
 * Migrates a database written by the legacy (v1, Mongoose) app to the v2 schema:
 *
 *  - products.brand / products.category       -> { id: ObjectId, name } (v1 data has ids
 *                                                stored as strings or numbers, or the
 *                                                whole ref as a plain string; these are
 *                                                resolved via the brands/categories
 *                                                collections by name when needed)
 *  - products.ratings[] / products.reviews[]  -> `ratings` / `reviews` collections
 *  - products.averageRating (string)          -> recomputed number + ratingCount/reviewCounts
 *  - users.password                           -> users.passwordHash
 *  - users.bucketList[] product snapshots     -> [{ productId, addedAt }]
 *
 *   npm run db:migrate-legacy            # dry run: reports what would change
 *   npm run db:migrate-legacy -- --apply # performs the migration
 *
 * Safe to re-run: ratings are upserted and reviews keep their original _id.
 * Back up the database before running with --apply.
 */
import { type AnyBulkWriteOperation, ObjectId } from "mongodb";
import type { RatingDoc, RefDoc, ReviewDoc } from "../src/lib/db/schema";
import { collections, connect, ensureIndexes, recomputeProductStats } from "./lib";

interface LegacyRating {
  userId?: unknown;
  name?: string;
  rating?: number;
}

interface LegacyReview {
  _id?: unknown;
  userId?: unknown;
  name?: string;
  review?: string;
  type?: ReviewDoc["type"];
  date?: Date;
}

interface LegacyBucketEntry {
  productId?: unknown;
  date?: Date;
  addedAt?: Date;
}

/** ObjectId instances pass through; 24-char hex strings are converted; anything else is null. */
function asObjectId(value: unknown): ObjectId | null {
  if (value instanceof ObjectId) return value;
  if (typeof value === "string" && /^[a-f\d]{24}$/i.test(value)) return new ObjectId(value);
  return null;
}

const normaliseName = (name: string) => name.trim().replace(/\s+/g, " ").toLowerCase();

/**
 * Resolves a legacy brand/category reference to { id: ObjectId, name }.
 * Returns null when it can't be resolved (reported, left untouched).
 */
function resolveRef(value: unknown, idsByName: Map<string, ObjectId>): RefDoc | null {
  let id: ObjectId | null = null;
  let name = "";
  if (typeof value === "string") {
    name = value;
  } else if (value && typeof value === "object") {
    const ref = value as { id?: unknown; name?: unknown };
    name = typeof ref.name === "string" ? ref.name : "";
    id = asObjectId(ref.id);
  }
  id ??= name ? (idsByName.get(normaliseName(name)) ?? null) : null;
  return id && name ? { id, name } : null;
}

function sameRef(value: unknown, ref: RefDoc): boolean {
  const current = value as { id?: unknown; name?: unknown } | null;
  return (
    !!current &&
    typeof current === "object" &&
    current.id instanceof ObjectId &&
    current.id.equals(ref.id) &&
    current.name === ref.name
  );
}

const apply = process.argv.includes("--apply");
const { client, db } = await connect();

try {
  const c = collections(db);
  const raw = db.collection("products");
  const rawUsers = db.collection("users");

  if (apply) await ensureIndexes(db);

  const brandIds = new Map(
    (await c.brands.find({}, { projection: { name: 1 } }).toArray()).map((b) => [normaliseName(b.name), b._id]),
  );
  const categoryIds = new Map(
    (await c.categories.find({}, { projection: { name: 1 } }).toArray()).map((x) => [normaliseName(x.name), x._id]),
  );

  // ------------------------------------------------------------- products
  let productCount = 0;
  let refsFixed = 0;
  let ratingCount = 0;
  let reviewCount = 0;
  let skipped = 0;
  const unresolved: string[] = [];

  for await (const product of raw.find({})) {
    const productId = product._id as ObjectId;
    productCount++;

    // Brand / category references
    const set: Record<string, unknown> = {};
    const brand = resolveRef(product.brand, brandIds);
    const category = resolveRef(product.category, categoryIds);
    if (!brand) unresolved.push(`${product.name}: brand ${JSON.stringify(product.brand)}`);
    else if (!sameRef(product.brand, brand)) {
      // Keep extra fields such as the brand logo when the ref was an object.
      set.brand = { ...(typeof product.brand === "object" ? product.brand : {}), ...brand };
    }
    if (!category) unresolved.push(`${product.name}: category ${JSON.stringify(product.category)}`);
    else if (!sameRef(product.category, category)) set.category = category;
    if (Object.keys(set).length) refsFixed++;

    // Embedded ratings and reviews
    const ratings = (product.ratings ?? []) as LegacyRating[];
    const reviews = (product.reviews ?? []) as LegacyReview[];

    const ratingOps: AnyBulkWriteOperation<RatingDoc>[] = [];
    for (const r of ratings) {
      const userId = asObjectId(r.userId);
      if (!userId || typeof r.rating !== "number") {
        skipped++;
        continue;
      }
      ratingOps.push({
        updateOne: {
          filter: { productId, userId },
          update: {
            $set: {
              value: Math.min(10, Math.max(1, Math.round(r.rating))),
              userName: r.name ?? "anonymous",
              updatedAt: new Date(),
            },
            $setOnInsert: { _id: new ObjectId(), productId, userId, createdAt: new Date() },
          },
          upsert: true,
        },
      });
    }

    const reviewOps: AnyBulkWriteOperation<ReviewDoc>[] = [];
    for (const r of reviews) {
      const userId = asObjectId(r.userId);
      if (!userId || !r.review || !r.type) {
        skipped++;
        continue;
      }
      const _id = asObjectId(r._id) ?? new ObjectId();
      reviewOps.push({
        updateOne: {
          filter: { _id },
          update: {
            $setOnInsert: {
              _id,
              productId,
              userId,
              userName: r.name ?? "anonymous",
              type: r.type,
              body: r.review,
              createdAt: r.date ?? new Date(),
            },
          },
          upsert: true,
        },
      });
    }

    ratingCount += ratingOps.length;
    reviewCount += reviewOps.length;

    if (apply) {
      if (ratingOps.length) await c.ratings.bulkWrite(ratingOps, { ordered: false });
      if (reviewOps.length) await c.reviews.bulkWrite(reviewOps, { ordered: false });
      await raw.updateOne(
        { _id: productId },
        {
          ...(Object.keys(set).length ? { $set: set } : {}),
          $unset: { ratings: "", reviews: "", __v: "" },
        },
      );
      await recomputeProductStats(db, productId);
    }
  }

  // ---------------------------------------------------------------- users
  let userCount = 0;
  for await (const user of rawUsers.find({})) {
    userCount++;
    if (!apply) continue;

    // Keep valid product ids only, de-duplicated (the legacy app allowed duplicates).
    const seen = new Set<string>();
    const bucketList = ((user.bucketList ?? []) as LegacyBucketEntry[]).flatMap((entry) => {
      const productId = asObjectId(entry.productId);
      if (!productId || seen.has(productId.toHexString())) return [];
      seen.add(productId.toHexString());
      return [{ productId, addedAt: entry.addedAt ?? entry.date ?? new Date() }];
    });

    const set: Record<string, unknown> = { bucketList };
    if (typeof user.password === "string" && !user.passwordHash) set.passwordHash = user.password;
    await rawUsers.updateOne({ _id: user._id }, { $set: set, $unset: { password: "", __v: "" } });
  }

  console.log(
    `${apply ? "Migrated" : "Would migrate"}: ${productCount} products ` +
      `(${refsFixed} with brand/category refs to normalise), ${ratingCount} ratings, ` +
      `${reviewCount} reviews, ${userCount} users.`,
  );
  if (skipped) console.log(`Skipped ${skipped} malformed embedded ratings/reviews (missing user id or fields).`);
  if (unresolved.length) {
    console.log(
      `\n${unresolved.length} brand/category refs could not be matched to the brands/categories ` +
        `collections by id or name and were left as they are:`,
    );
    for (const line of unresolved.slice(0, 20)) console.log(`  - ${line}`);
    if (unresolved.length > 20) console.log(`  … and ${unresolved.length - 20} more`);
  }
  if (!apply) console.log("\nDry run only. Re-run with --apply to write changes.");
  else console.log("\nThe legacy `toprateds` collection is no longer used and can be dropped manually.");
} finally {
  await client.close();
}
