/*
 * Seeds the catalog (categories, brands, products) from seed/catalog.json.
 *
 *   npm run db:seed            # refuses if products already exist
 *   npm run db:seed -- --reset # deletes the catalog collections first (dev only!)
 *
 * Users, ratings and reviews are never touched.
 */
import { readFile } from "node:fs/promises";
import { ObjectId } from "mongodb";
import type { ProductDoc } from "../src/lib/db/schema";
import { collections, connect, ensureIndexes } from "./lib";

interface SeedRef {
  id: number;
  name: string;
}

interface SeedFile {
  // The legacy export is inconsistent: brand/category are sometimes plain strings.
  products: { name: string; brand: SeedRef | string; category?: SeedRef | string; img?: string }[];
  brands: SeedRef[];
  categories: SeedRef[];
}

const normalise = (name: string) => name.trim().replace(/\s+/g, " ").toLowerCase();

const reset = process.argv.includes("--reset");
const seed = JSON.parse(
  await readFile(new URL("../seed/catalog.json", import.meta.url), "utf8"),
) as SeedFile;

const { client, db } = await connect();
try {
  const c = collections(db);

  if (reset) {
    await Promise.all([c.products.deleteMany({}), c.brands.deleteMany({}), c.categories.deleteMany({})]);
    console.log("Cleared products, brands and categories.");
  } else if ((await c.products.estimatedDocumentCount()) > 0) {
    console.error("Products already exist. Re-run with --reset to replace the catalog.");
    process.exit(1);
  }

  await ensureIndexes(db);
  const now = new Date();

  // Names are de-duplicated case-insensitively (the seed has e.g. two
  // spellings of "International Beverages Pvt. Ltd.").
  const categoryIds = new Map<string, ObjectId>();
  for (const name of [...seed.categories.map((x) => x.name), "other"].map(normalise)) {
    if (!categoryIds.has(name)) categoryIds.set(name, new ObjectId());
  }
  const brandIds = new Map<string, ObjectId>();
  for (const name of seed.brands.map((x) => normalise(x.name))) {
    if (!brandIds.has(name)) brandIds.set(name, new ObjectId());
  }

  const products: ProductDoc[] = seed.products.map((p) => {
    const brandName = normalise(typeof p.brand === "string" ? p.brand : p.brand.name);
    const rawCategory = typeof p.category === "string" ? p.category : p.category?.name;
    const categoryName = normalise(rawCategory ?? "other");
    if (!brandIds.has(brandName)) brandIds.set(brandName, new ObjectId());
    if (!categoryIds.has(categoryName)) categoryIds.set(categoryName, new ObjectId());

    return {
      _id: new ObjectId(),
      name: normalise(p.name),
      brand: { id: brandIds.get(brandName)!, name: brandName },
      category: { id: categoryIds.get(categoryName)!, name: categoryName },
      img: p.img || null,
      tags: [categoryName],
      averageRating: null,
      ratingCount: 0,
      reviewCounts: { positive: 0, moderate: 0, negative: 0 },
      createdAt: now,
      updatedAt: now,
    };
  });

  const usedCategories = new Set(products.map((p) => p.category.name));
  await c.categories.insertMany(
    [...categoryIds]
      .filter(([name]) => usedCategories.has(name))
      .map(([name, _id]) => ({ _id, name, img: null, createdAt: now, updatedAt: now })),
  );
  await c.brands.insertMany(
    [...brandIds].map(([name, _id]) => ({ _id, name, img: null, createdAt: now, updatedAt: now })),
  );
  await c.products.insertMany(products);

  console.log(
    `Seeded ${usedCategories.size} categories, ${brandIds.size} brands and ${products.length} products.`,
  );
} finally {
  await client.close();
}
