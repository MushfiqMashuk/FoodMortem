import "server-only";
import type { Filter } from "mongodb";
import { cache } from "react";
import { db, toObjectId } from "@/lib/db/client";
import { idString, refIdFilter } from "@/lib/db/ids";
import type { BrandDoc, CategoryDoc, ProductDoc } from "@/lib/db/schema";
import { safeImageUrl } from "@/lib/images";
import type { Brand, Category, Product, Ref } from "./types";

const BY_RATING = { averageRating: -1, ratingCount: -1, name: 1 } as const;

/** Tolerates legacy refs stored as plain strings or missing entirely. */
function toRef(value: unknown): Ref {
  if (value && typeof value === "object") {
    const ref = value as { id?: unknown; name?: unknown };
    return { id: idString(ref.id), name: typeof ref.name === "string" ? ref.name : "" };
  }
  return { id: "", name: typeof value === "string" ? value : "" };
}

export function toProduct(doc: ProductDoc): Product {
  return {
    id: doc._id.toHexString(),
    name: doc.name,
    img: safeImageUrl(doc.img),
    brand: toRef(doc.brand),
    category: toRef(doc.category),
    tags: doc.tags ?? [],
    averageRating: typeof doc.averageRating === "number" ? doc.averageRating : null,
    ratingCount: doc.ratingCount ?? 0,
    reviewCounts: doc.reviewCounts ?? { positive: 0, moderate: 0, negative: 0 },
  };
}

function toBrand(doc: BrandDoc): Brand {
  return { id: doc._id.toHexString(), name: doc.name, img: safeImageUrl(doc.img) };
}

function toCategory(doc: CategoryDoc): Category {
  return { id: doc._id.toHexString(), name: doc.name, img: safeImageUrl(doc.img) };
}

export interface ProductQuery {
  brandId?: string;
  categoryId?: string;
  categoryName?: string;
  /** Multi-select filters by name (from URL search params). */
  brandNames?: string[];
  categoryNames?: string[];
  /** Only products with at least one rating. */
  ratedOnly?: boolean;
  limit?: number;
}

export async function listProducts(query: ProductQuery = {}): Promise<Product[]> {
  const filter: Filter<ProductDoc> = {};

  if (query.brandId) {
    const id = toObjectId(query.brandId);
    if (!id) return [];
    filter["brand.id"] = refIdFilter(id);
  }
  if (query.categoryId) {
    const id = toObjectId(query.categoryId);
    if (!id) return [];
    filter["category.id"] = refIdFilter(id);
  }
  if (query.categoryName) filter["category.name"] = query.categoryName;
  if (query.brandNames?.length) filter["brand.name"] = { $in: query.brandNames };
  if (query.categoryNames?.length) {
    filter["category.name"] = { $in: query.categoryNames };
  }
  if (query.ratedOnly) filter.ratingCount = { $gt: 0 };

  const { products } = await db();
  const cursor = products.find(filter).sort(BY_RATING);
  if (query.limit) cursor.limit(query.limit);
  return (await cursor.toArray()).map(toProduct);
}

export const getProduct = cache(async (id: string): Promise<Product | null> => {
  const _id = toObjectId(id);
  if (!_id) return null;
  const doc = await (await db()).products.findOne({ _id });
  return doc ? toProduct(doc) : null;
});

/** Products sharing a tag or category with the given one, best rated first. */
export async function listSimilarProducts(product: Product, limit = 8): Promise<Product[]> {
  const categoryId = toObjectId(product.category.id);
  const or: Filter<ProductDoc>[] = [{ tags: { $in: product.tags } }];
  if (categoryId) or.push({ "category.id": refIdFilter(categoryId) });

  const { products } = await db();
  const docs = await products
    .find({ _id: { $ne: toObjectId(product.id)! }, $or: or })
    .sort(BY_RATING)
    .limit(limit)
    .toArray();
  return docs.map(toProduct);
}

export async function listBrands(): Promise<Brand[]> {
  const docs = await (await db()).brands.find().sort({ name: 1 }).toArray();
  return docs.map(toBrand);
}

export const getBrand = cache(async (id: string): Promise<Brand | null> => {
  const _id = toObjectId(id);
  if (!_id) return null;
  const doc = await (await db()).brands.findOne({ _id });
  return doc ? toBrand(doc) : null;
});

export async function listCategories(): Promise<Category[]> {
  const docs = await (await db()).categories.find().sort({ name: 1 }).toArray();
  return docs.map(toCategory);
}

export const getCategory = cache(async (id: string): Promise<Category | null> => {
  const _id = toObjectId(id);
  if (!_id) return null;
  const doc = await (await db()).categories.findOne({ _id });
  return doc ? toCategory(doc) : null;
});

/** Distinct category names a brand has products in (for brand page filters). */
export async function listCategoryNamesForBrand(brandId: string): Promise<string[]> {
  const id = toObjectId(brandId);
  if (!id) return [];
  const names = await (await db()).products.distinct("category.name", { "brand.id": refIdFilter(id) });
  return names.sort();
}

/** Distinct brand names with products in a category (for category page filters). */
export async function listBrandNamesForCategory(categoryId: string): Promise<string[]> {
  const id = toObjectId(categoryId);
  if (!id) return [];
  const names = await (await db()).products.distinct("brand.name", { "category.id": refIdFilter(id) });
  return names.sort();
}
