import type { ObjectId } from "mongodb";
import type { ReviewType } from "@/lib/domain";

/*
 * MongoDB document shapes. Collection names match the legacy Mongoose models
 * so an existing database can be migrated in place (see scripts/migrate-legacy.ts).
 */

export interface RefDoc {
  id: ObjectId;
  name: string;
}

export interface ReviewCounts {
  positive: number;
  moderate: number;
  negative: number;
}

export interface ProductDoc {
  _id: ObjectId;
  name: string;
  brand: RefDoc & { img?: string };
  category: RefDoc;
  img?: string | null;
  tags?: string[];
  /** Denormalised from the `ratings` collection; recomputed on every change. */
  averageRating?: number | null;
  ratingCount?: number;
  /** Denormalised from the `reviews` collection; recomputed on every change. */
  reviewCounts?: ReviewCounts;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BrandDoc {
  _id: ObjectId;
  name: string;
  img?: string | null;
  restaurant?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryDoc {
  _id: ObjectId;
  name: string;
  img?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BucketListEntryDoc {
  productId: ObjectId;
  addedAt: Date;
}

export interface UserDoc {
  _id: ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  bucketList: BucketListEntryDoc[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RatingDoc {
  _id: ObjectId;
  productId: ObjectId;
  userId: ObjectId;
  userName: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewDoc {
  _id: ObjectId;
  productId: ObjectId;
  userId: ObjectId;
  userName: string;
  type: ReviewType;
  body: string;
  createdAt: Date;
}

export interface SuggestionDoc {
  _id: ObjectId;
  productName: string;
  brandName: string;
  location?: string;
  userId?: ObjectId;
  createdAt: Date;
}
