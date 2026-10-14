import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityHeader } from "@/components/EntityHeader";
import { FilterChips, paramList } from "@/components/FilterChips";
import { ProductCollection } from "@/components/ProductCollection";
import { getCategory, listBrandNamesForCategory, listProducts } from "@/lib/data/catalog";

export async function generateMetadata({ params }: PageProps<"/categories/[categoryId]">): Promise<Metadata> {
  const category = await getCategory((await params).categoryId);
  return category ? { title: category.name } : {};
}

export default async function CategoryPage({ params, searchParams }: PageProps<"/categories/[categoryId]">) {
  const { categoryId } = await params;
  const category = await getCategory(categoryId);
  if (!category) notFound();

  const brand = paramList((await searchParams).brand);
  const [products, brandNames] = await Promise.all([
    listProducts({ categoryId: category.id, brandNames: brand }),
    listBrandNamesForCategory(category.id),
  ]);

  return (
    <>
      <EntityHeader eyebrow="Category" title={category.name} img={category.img} />
      <FilterChips
        label="Brand"
        param="brand"
        options={brandNames}
        selected={brand}
        pathname={`/categories/${category.id}`}
        searchParams={{ brand }}
      />
      <ProductCollection products={products} hide="category" emptyMessage="No products in this category yet." />
    </>
  );
}
