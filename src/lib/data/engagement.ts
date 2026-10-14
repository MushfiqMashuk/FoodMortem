import "server-only";
import { ObjectId } from "mongodb";
import { db, toObjectId } from "@/lib/db/client";
import type { ReviewCounts } from "@/lib/db/schema";
import { roundRating, type ReviewType } from "@/lib/domain";
import type { Review } from "./types";

/*
 * Ratings and reviews live in their own collections (one rating per user per
 * product, enforced by a unique index). The product document only carries
 * denormalised aggregates, recomputed from the source of truth after each
 * write so concurrent updates converge on the correct value.
 */

async function recomputeRatingStats(productId: ObjectId): Promise<void> {
  const { ratings, products } = await db();
  const [stats] = await ratings
    .aggregate<{ average: number; count: number }>([
      { $match: { productId } },
      { $group: { _id: null, average: { $avg: "$value" }, count: { $sum: 1 } } },
    ])
    .toArray();
  await products.updateOne(
    { _id: productId },
    {
      $set: {
        averageRating: stats ? roundRating(stats.average) : null,
        ratingCount: stats?.count ?? 0,
        updatedAt: new Date(),
      },
    },
  );
}

async function recomputeReviewCounts(productId: ObjectId): Promise<void> {
  const { reviews, products } = await db();
  const rows = await reviews
    .aggregate<{ _id: ReviewType; count: number }>([
      { $match: { productId } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ])
    .toArray();
  const counts: ReviewCounts = { positive: 0, moderate: 0, negative: 0 };
  for (const row of rows) counts[row._id] = row.count;
  await products.updateOne(
    { _id: productId },
    { $set: { reviewCounts: counts, updatedAt: new Date() } },
  );
}

async function productExists(productId: ObjectId): Promise<boolean> {
  const { products } = await db();
  return (await products.countDocuments({ _id: productId }, { limit: 1 })) > 0;
}

// ---------------------------------------------------------------- ratings

export async function getUserRating(productId: string, userId: string): Promise<number | null> {
  const pid = toObjectId(productId);
  const uid = toObjectId(userId);
  if (!pid || !uid) return null;
  const doc = await (await db()).ratings.findOne(
    { productId: pid, userId: uid },
    { projection: { value: 1 } },
  );
  return doc?.value ?? null;
}

/** Creates or updates the user's rating. Returns false if the product doesn't exist. */
export async function upsertRating(
  productId: string,
  user: { id: string; name: string },
  value: number,
): Promise<boolean> {
  const pid = toObjectId(productId);
  const uid = toObjectId(user.id);
  if (!pid || !uid || !(await productExists(pid))) return false;

  const now = new Date();
  await (await db()).ratings.updateOne(
    { productId: pid, userId: uid },
    {
      $set: { value, userName: user.name, updatedAt: now },
      $setOnInsert: { _id: new ObjectId(), productId: pid, userId: uid, createdAt: now },
    },
    { upsert: true },
  );
  await recomputeRatingStats(pid);
  return true;
}

export async function deleteRating(productId: string, userId: string): Promise<void> {
  const pid = toObjectId(productId);
  const uid = toObjectId(userId);
  if (!pid || !uid) return;
  await (await db()).ratings.deleteOne({ productId: pid, userId: uid });
  await recomputeRatingStats(pid);
}

// ---------------------------------------------------------------- reviews

export async function listReviews(
  productId: string,
  options: { limit?: number } = {},
): Promise<Review[]> {
  const pid = toObjectId(productId);
  if (!pid) return [];
  const { reviews, ratings } = await db();

  const cursor = reviews.find({ productId: pid }).sort({ createdAt: -1, _id: -1 });
  if (options.limit) cursor.limit(options.limit);
  const docs = await cursor.toArray();
  if (docs.length === 0) return [];

  // Attach each reviewer's rating with one query instead of N.
  const reviewerIds = [...new Set(docs.map((doc) => doc.userId.toHexString()))].map(
    (id) => new ObjectId(id),
  );
  const reviewerRatings = await ratings
    .find({ productId: pid, userId: { $in: reviewerIds } }, { projection: { userId: 1, value: 1 } })
    .toArray();
  const ratingByUser = new Map(reviewerRatings.map((r) => [r.userId.toHexString(), r.value]));

  return docs.map((doc) => ({
    id: doc._id.toHexString(),
    productId: doc.productId.toHexString(),
    userId: doc.userId.toHexString(),
    userName: doc.userName,
    type: doc.type,
    body: doc.body,
    createdAt: doc.createdAt.toISOString(),
    rating: ratingByUser.get(doc.userId.toHexString()) ?? null,
  }));
}

export async function addReview(
  productId: string,
  user: { id: string; name: string },
  review: { type: ReviewType; body: string },
): Promise<boolean> {
  const pid = toObjectId(productId);
  const uid = toObjectId(user.id);
  if (!pid || !uid || !(await productExists(pid))) return false;

  await (await db()).reviews.insertOne({
    _id: new ObjectId(),
    productId: pid,
    userId: uid,
    userName: user.name,
    type: review.type,
    body: review.body,
    createdAt: new Date(),
  });
  await recomputeReviewCounts(pid);
  return true;
}

/**
 * Deletes a review only if it belongs to the given user. Returns the product
 * id of the deleted review, or null if nothing was deleted.
 */
export async function deleteOwnReview(reviewId: string, userId: string): Promise<string | null> {
  const rid = toObjectId(reviewId);
  const uid = toObjectId(userId);
  if (!rid || !uid) return null;
  const deleted = await (await db()).reviews.findOneAndDelete({ _id: rid, userId: uid });
  if (!deleted) return null;
  await recomputeReviewCounts(deleted.productId);
  return deleted.productId.toHexString();
}
