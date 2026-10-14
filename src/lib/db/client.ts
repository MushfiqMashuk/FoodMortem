import "server-only";
import { MongoClient, ObjectId } from "mongodb";
import { env } from "@/lib/env";
import type {
  BrandDoc,
  CategoryDoc,
  ProductDoc,
  RatingDoc,
  ReviewDoc,
  SuggestionDoc,
  UserDoc,
} from "./schema";

// Reuse one client across hot reloads in dev and across requests in prod.
const globalForMongo = globalThis as typeof globalThis & {
  _foodmortemMongo?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
  if (!globalForMongo._foodmortemMongo) {
    globalForMongo._foodmortemMongo = new MongoClient(env().MONGODB_URI, {
      appName: "foodmortem",
    })
      .connect()
      .catch((error: unknown) => {
        // Don't cache a failed connection; the next request retries.
        globalForMongo._foodmortemMongo = undefined;
        throw error;
      });
  }
  return globalForMongo._foodmortemMongo;
}

/** Typed collections. The database name comes from the connection string. */
export async function db() {
  const database = (await getClient()).db();
  return {
    products: database.collection<ProductDoc>("products"),
    brands: database.collection<BrandDoc>("brands"),
    categories: database.collection<CategoryDoc>("categories"),
    users: database.collection<UserDoc>("users"),
    ratings: database.collection<RatingDoc>("ratings"),
    reviews: database.collection<ReviewDoc>("reviews"),
    suggestions: database.collection<SuggestionDoc>("suggestions"),
  };
}

/** Parses a route/form id. Returns null for anything that isn't a valid ObjectId. */
export function toObjectId(id: unknown): ObjectId | null {
  return typeof id === "string" && /^[a-f\d]{24}$/i.test(id)
    ? new ObjectId(id)
    : null;
}
