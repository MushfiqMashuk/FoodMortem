import "server-only";
import { MongoServerError, ObjectId } from "mongodb";
import { cache } from "react";
import { db, toObjectId } from "@/lib/db/client";
import { idString } from "@/lib/db/ids";
import { toProduct } from "./catalog";
import type { Product } from "./types";

export class EmailTakenError extends Error {
  constructor() {
    super("An account with this email already exists");
  }
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<{ id: string; name: string }> {
  const now = new Date();
  const _id = new ObjectId();
  try {
    await (await db()).users.insertOne({
      _id,
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash,
      bucketList: [],
      createdAt: now,
      updatedAt: now,
    });
  } catch (error) {
    // Unique index on email (see scripts/create-indexes.ts).
    if (error instanceof MongoServerError && error.code === 11000) {
      throw new EmailTakenError();
    }
    throw error;
  }
  return { id: _id.toHexString(), name: input.name };
}

export async function findUserForSignIn(email: string) {
  return (await db()).users.findOne(
    { email },
    { projection: { _id: 1, name: 1, passwordHash: 1 } },
  );
}

// ---------------------------------------------------------------- bucket list

/** Product ids on the user's bucket list, memoised per request. */
export const getBucketListIds = cache(async (userId: string): Promise<Set<string>> => {
  const uid = toObjectId(userId);
  if (!uid) return new Set();
  const user = await (await db()).users.findOne(
    { _id: uid },
    { projection: { "bucketList.productId": 1 } },
  );
  return new Set(user?.bucketList?.map((entry) => idString(entry.productId)).filter(Boolean) ?? []);
});

/** Bucket-list products with live ratings, most recently added first. */
export async function listBucketListProducts(userId: string): Promise<Product[]> {
  const uid = toObjectId(userId);
  if (!uid) return [];
  const { users, products } = await db();
  const user = await users.findOne({ _id: uid }, { projection: { bucketList: 1 } });
  // Legacy (v1) entries have `date` instead of `addedAt`.
  const addedAt = (entry: object) => {
    const { addedAt, date } = entry as { addedAt?: Date; date?: Date };
    return new Date(addedAt ?? date ?? 0).getTime();
  };
  const entries = [...(user?.bucketList ?? [])].sort((a, b) => addedAt(b) - addedAt(a));
  if (entries.length === 0) return [];

  const docs = await products.find({ _id: { $in: entries.map((e) => e.productId) } }).toArray();
  const byId = new Map(docs.map((doc) => [doc._id.toHexString(), doc]));
  return entries.flatMap((entry) => {
    const doc = byId.get(idString(entry.productId));
    return doc ? [toProduct(doc)] : [];
  });
}

export async function addToBucketList(userId: string, productId: string): Promise<boolean> {
  const uid = toObjectId(userId);
  const pid = toObjectId(productId);
  if (!uid || !pid) return false;
  const { users, products } = await db();
  if ((await products.countDocuments({ _id: pid }, { limit: 1 })) === 0) return false;

  // The filter makes this idempotent: a product is never added twice.
  await users.updateOne(
    { _id: uid, "bucketList.productId": { $ne: pid } },
    {
      $push: { bucketList: { productId: pid, addedAt: new Date() } },
      $set: { updatedAt: new Date() },
    },
  );
  return true;
}

export async function removeFromBucketList(userId: string, productId: string): Promise<void> {
  const uid = toObjectId(userId);
  const pid = toObjectId(productId);
  if (!uid || !pid) return;
  await (await db()).users.updateOne(
    { _id: uid },
    { $pull: { bucketList: { productId: pid } }, $set: { updatedAt: new Date() } },
  );
}

// ---------------------------------------------------------------- suggestions

export async function createSuggestion(input: {
  productName: string;
  brandName: string;
  location?: string;
  userId?: string;
}): Promise<void> {
  const userId = input.userId ? toObjectId(input.userId) : null;
  await (await db()).suggestions.insertOne({
    _id: new ObjectId(),
    productName: input.productName,
    brandName: input.brandName,
    ...(input.location ? { location: input.location } : {}),
    ...(userId ? { userId } : {}),
    createdAt: new Date(),
  });
}
