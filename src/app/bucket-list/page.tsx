import type { Metadata } from "next";
import { ProductCollection } from "@/components/ProductCollection";
import { requireSession } from "@/lib/auth/session";
import { listBucketListProducts } from "@/lib/data/users";

export const metadata: Metadata = { title: "Your bucket list" };

export default async function BucketListPage() {
  const user = await requireSession("/bucket-list");
  const products = await listBucketListProducts(user.id);

  return (
    <>
      <h1>Your bucket list</h1>
      <p className="muted">Foods you want to try. Ratings shown are live.</p>
      <ProductCollection
        products={products}
        emptyMessage="Your bucket list is empty. Add products you want to try from any product card."
      />
    </>
  );
}
