import { ObjectId } from "mongodb";

/*
 * Databases written by the v1 app don't always store references as ObjectIds:
 * some product `brand.id` / `category.id` values are hex strings (or even the
 * numeric ids from the old json-server data). `npm run db:migrate-legacy`
 * normalises them; until then these helpers keep reads from crashing.
 */

/** String form of an id stored as an ObjectId, hex string or number. */
export function idString(id: unknown): string {
  if (id instanceof ObjectId) return id.toHexString();
  if (typeof id === "string" || typeof id === "number") return String(id);
  return "";
}

/** Matches a reference stored either as an ObjectId or as its hex string. */
export function refIdFilter(id: ObjectId) {
  return { $in: [id, id.toHexString()] as unknown as ObjectId[] };
}
