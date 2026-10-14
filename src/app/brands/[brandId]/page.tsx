import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityHeader } from "@/components/EntityHeader";
import { FilterChips, paramList } from "@/components/FilterChips";
import { ProductCollection } from "@/components/ProductCollection";
import { getBrand, listCategoryNamesForBrand, listProducts } from "@/lib/data/catalog";

export async function generateMetadata({ params }: PageProps<"/brands/[brandId]">): Promise<Metadata> {
  const brand = await getBrand((await params).brandId);
  return brand ? { title: brand.name } : {};
}

export default async function BrandPage({ params, searchParams }: PageProps<"/brands/[brandId]">) {
  const { brandId } = await params;
  const brand = await getBrand(brandId);
  if (!brand) notFound();

  const category = paramList((await searchParams).category);
  const [products, categoryNames] = await Promise.all([
    listProducts({ brandId: brand.id, categoryNames: category }),
    listCategoryNamesForBrand(brand.id),
  ]);

  return (
    <>
      <EntityHeader eyebrow="Brand" title={brand.name} img={brand.img} />
      <FilterChips
        label="Category"
        param="category"
        options={categoryNames}
        selected={category}
        pathname={`/brands/${brand.id}`}
        searchParams={{ category }}
      />
      <ProductCollection products={products} hide="brand" emptyMessage="No products from this brand yet." />
    </>
  );
}
