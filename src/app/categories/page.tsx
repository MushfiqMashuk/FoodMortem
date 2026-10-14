import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";
import { listCategories } from "@/lib/data/catalog";
import { FALLBACK_IMAGE } from "@/lib/images";

export const metadata: Metadata = { title: "Categories" };

export default async function CategoriesPage() {
  const categories = await listCategories();
  return (
    <>
      <h1>Categories</h1>
      {categories.length === 0 ? (
        <EmptyState>No categories yet.</EmptyState>
      ) : (
        <ul className="tile-grid">
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/categories/${category.id}`} className="card tile">
                <span className="tile__image">
                  <Image src={category.img ?? FALLBACK_IMAGE} alt="" fill sizes="64px" />
                </span>
                <span className="tile__name">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
