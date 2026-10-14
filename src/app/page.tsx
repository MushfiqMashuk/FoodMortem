import Link from "next/link";
import { ProductCollection } from "@/components/ProductCollection";
import { listProducts } from "@/lib/data/catalog";
import { featuredCategories } from "@/lib/env";

export default async function HomePage() {
  const featured = featuredCategories();
  const [topRated, ...sections] = await Promise.all([
    listProducts({ ratedOnly: true, limit: 8 }),
    ...featured.map((categoryName) => listProducts({ categoryName, limit: 8 })),
  ]);

  return (
    <>
      <section className="hero">
        <h1>Find food that&apos;s actually worth it.</h1>
        <p>Real ratings and reviews from people who ate it, so you don&apos;t have to guess.</p>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Top rated</h2>
          <Link href="/products">See all products →</Link>
        </div>
        <ProductCollection products={topRated ?? []} layout="row" emptyMessage="Nothing has been rated yet. Be the first!" />
      </section>

      {featured.map((name, index) => {
        const products = sections[index] ?? [];
        const categoryId = products[0]?.category.id;
        return (
          <section key={name} className="section">
            <div className="section__header">
              <h2 className="capitalize">{name}</h2>
              {categoryId && <Link href={`/categories/${categoryId}`}>See all →</Link>}
            </div>
            <ProductCollection
              products={products}
              layout="row"
              hide="category"
              emptyMessage={`No ${name} products yet.`}
            />
          </section>
        );
      })}
    </>
  );
}
