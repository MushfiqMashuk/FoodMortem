/*
 * Shared helpers for CLI scripts. Scripts run outside Next.js, so they can't
 * import the `server-only` modules in src/lib; they talk to MongoDB directly.
 */
import { type Db, MongoClient, type ObjectId } from "mongodb";
import type {
  BrandDoc,
  CategoryDoc,
  ProductDoc,
  RatingDoc,
  ReviewCounts,
  ReviewDoc,
  UserDoc,
} from "../src/lib/db/schema";

export async function connect(): Promise<{ client: MongoClient; db: Db }> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Copy .env.example to .env.local and fill it in.");
    process.exit(1);
  }
  const client = await new MongoClient(uri).connect();
  return { client, db: client.db() };
}

export function collections(db: Db) {
  return {
    products: db.collection<ProductDoc>("products"),
    brands: db.collection<BrandDoc>("brands"),
    categories: db.collection<CategoryDoc>("categories"),
    users: db.collection<UserDoc>("users"),
    ratings: db.collection<RatingDoc>("ratings"),
    reviews: db.collection<ReviewDoc>("reviews"),
  };
}

export async function ensureIndexes(db: Db): Promise<void> {
  const c = collections(db);
  await Promise.all([
    c.users.createIndex({ email: 1 }, { unique: true }),
    c.brands.createIndex({ name: 1 }, { unique: true }),
    c.categories.createIndex({ name: 1 }, { unique: true }),
    c.ratings.createIndex({ productId: 1, userId: 1 }, { unique: true }),
    c.ratings.createIndex({ userId: 1 }),
    c.reviews.createIndex({ productId: 1, createdAt: -1 }),
    c.reviews.createIndex({ userId: 1 }),
    c.products.createIndex({ averageRating: -1, ratingCount: -1, name: 1 }),
    c.products.createIndex({ "brand.id": 1 }),
    c.products.createIndex({ "category.id": 1 }),
    c.products.createIndex({ "brand.name": 1 }),
    c.products.createIndex({ "category.name": 1 }),
    c.products.createIndex({ tags: 1 }),
  ]);
}

/** Recomputes a product's denormalised rating and review aggregates. */
export async function recomputeProductStats(db: Db, productId: ObjectId): Promise<void> {
  const c = collections(db);
  const [rating] = await c.ratings
    .aggregate<{ average: number; count: number }>([
      { $match: { productId } },
      { $group: { _id: null, average: { $avg: "$value" }, count: { $sum: 1 } } },
    ])
    .toArray();
  const reviewRows = await c.reviews
    .aggregate<{ _id: keyof ReviewCounts; count: number }>([
      { $match: { productId } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ])
    .toArray();
  const reviewCounts: ReviewCounts = { positive: 0, moderate: 0, negative: 0 };
  for (const row of reviewRows) reviewCounts[row._id] = row.count;

  await c.products.updateOne(
    { _id: productId },
    {
      $set: {
        averageRating: rating ? Math.round(rating.average * 10) / 10 : null,
        ratingCount: rating?.count ?? 0,
        reviewCounts,
      },
    },
  );
}
