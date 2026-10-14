import { getSession } from "@/lib/auth/session";
import { getBucketListIds } from "@/lib/data/users";
import type { Product } from "@/lib/data/types";
import { EmptyState } from "./EmptyState";
import { ProductCard } from "./ProductCard";

interface ProductCollectionProps {
  products: Product[];
  /** "grid" wraps; "row" is a horizontally scrolling carousel. */
  layout?: "grid" | "row";
  hide?: "brand" | "category";
  emptyMessage?: string;
}

/** Renders products with per-user bucket-list state, fetched once per request. */
export async function ProductCollection({
  products,
  layout = "grid",
  hide,
  emptyMessage = "No products to show yet.",
}: ProductCollectionProps) {
  if (products.length === 0) return <EmptyState>{emptyMessage}</EmptyState>;

  const user = await getSession();
  const bucketIds = user ? await getBucketListIds(user.id) : new Set<string>();

  return (
    <ul className={layout === "row" ? "product-row" : "product-grid"}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard
            product={product}
            signedIn={Boolean(user)}
            inBucketList={bucketIds.has(product.id)}
            hide={hide}
          />
        </li>
      ))}
    </ul>
  );
}
