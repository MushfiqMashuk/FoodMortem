import type { Metadata } from "next";
import { FilterChips, paramList } from "@/components/FilterChips";
import { ProductCollection } from "@/components/ProductCollection";
import { listBrands, listCategories, listProducts } from "@/lib/data/catalog";

export const metadata: Metadata = { title: "All products" };

export default async function ProductsPage({ searchParams }: PageProps<"/products">) {
  const params = await searchParams;
  const brand = paramList(params.brand);
  const category = paramList(params.category);

  const [products, brands, categories] = await Promise.all([
    listProducts({ brandNames: brand, categoryNames: category }),
    listBrands(),
    listCategories(),
  ]);
  const current = { brand, category };

  return (
    <>
      <h1>All products</h1>
      <div className="filter-panel">
        <FilterChips
          label="Category"
          param="category"
          options={categories.map((c) => c.name)}
          selected={category}
          pathname="/products"
          searchParams={current}
        />
        <FilterChips
          label="Brand"
          param="brand"
          options={brands.map((b) => b.name)}
          selected={brand}
          pathname="/products"
          searchParams={current}
        />
      </div>
      <p className="muted">{products.length} products</p>
      <ProductCollection products={products} emptyMessage="No products match these filters." />
    </>
  );
}
