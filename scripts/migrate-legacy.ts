/*
 * Migrates a database written by the legacy (v1, Mongoose) app to the v2 schema:
 *
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
import type { RatingDoc, ReviewDoc } from "../src/lib/db/schema";
import { collections, connect, ensureIndexes, recomputeProductStats } from "./lib";

interface LegacyRating {
  userId?: ObjectId;
  name?: string;
  rating?: number;
}

interface LegacyReview {
  _id?: ObjectId;
  userId?: ObjectId;
  name?: string;
  review?: string;
  type?: ReviewDoc["type"];
  date?: Date;
}

interface LegacyBucketEntry {
  productId?: ObjectId;
  date?: Date;
  addedAt?: Date;
}

const apply = process.argv.includes("--apply");
const { client, db } = await connect();

try {
  const c = collections(db);
  const raw = db.collection("products");
  const rawUsers = db.collection("users");

  if (apply) await ensureIndexes(db);

  // ------------------------------------------------------------- products
  let ratingCount = 0;
  let reviewCount = 0;
  let productCount = 0;

  for await (const product of raw.find({})) {
    const productId = product._id as ObjectId;
    const ratings = (product.ratings ?? []) as LegacyRating[];
    const reviews = (product.reviews ?? []) as LegacyReview[];
    productCount++;

    const ratingOps: AnyBulkWriteOperation<RatingDoc>[] = ratings
      .filter((r) => r.userId && typeof r.rating === "number")
      .map((r) => ({
        updateOne: {
          filter: { productId, userId: r.userId! },
          update: {
            $set: { value: Math.min(10, Math.max(1, Math.round(r.rating!))), userName: r.name ?? "anonymous", updatedAt: new Date() },
            $setOnInsert: { _id: new ObjectId(), productId, userId: r.userId!, createdAt: new Date() },
          },
          upsert: true,
        },
      }));

    const reviewOps: AnyBulkWriteOperation<ReviewDoc>[] = reviews
      .filter((r) => r.userId && r.review && r.type)
      .map((r) => {
        const _id = r._id ?? new ObjectId();
        return {
          updateOne: {
            filter: { _id },
            update: {
              $setOnInsert: {
                _id,
                productId,
                userId: r.userId!,
                userName: r.name ?? "anonymous",
                type: r.type!,
                body: r.review!,
                createdAt: r.date ?? new Date(),
              },
            },
            upsert: true,
          },
        };
      });

    ratingCount += ratingOps.length;
    reviewCount += reviewOps.length;

    if (apply) {
      if (ratingOps.length) await c.ratings.bulkWrite(ratingOps, { ordered: false });
      if (reviewOps.length) await c.reviews.bulkWrite(reviewOps, { ordered: false });
      await raw.updateOne({ _id: productId }, { $unset: { ratings: "", reviews: "" } });
      await recomputeProductStats(db, productId);
    }
  }

  // ---------------------------------------------------------------- users
  let userCount = 0;
  for await (const user of rawUsers.find({})) {
    userCount++;
    if (!apply) continue;

    const bucketList = ((user.bucketList ?? []) as LegacyBucketEntry[])
      .filter((entry) => entry.productId)
      .map((entry) => ({ productId: entry.productId!, addedAt: entry.addedAt ?? entry.date ?? new Date() }));
    // Remove duplicate products (the legacy app allowed them).
    const seen = new Set<string>();
    const deduped = bucketList.filter((entry) => {
      const key = entry.productId.toHexString();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const set: Record<string, unknown> = { bucketList: deduped };
    if (typeof user.password === "string" && !user.passwordHash) set.passwordHash = user.password;
    await rawUsers.updateOne(
      { _id: user._id },
      { $set: set, $unset: { password: "", __v: "" } },
    );
  }

  console.log(
    `${apply ? "Migrated" : "Would migrate"}: ${productCount} products, ${ratingCount} ratings, ` +
      `${reviewCount} reviews, ${userCount} users.`,
  );
  if (!apply) console.log("Dry run only. Re-run with --apply to write changes.");
  else console.log("The legacy `toprateds` collection is no longer used and can be dropped manually.");
} finally {
  await client.close();
}
