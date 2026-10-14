import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReviewBreakdown } from "@/components/ReviewBreakdown";
import { ReviewList } from "@/components/ReviewList";
import { WriteReviewButton } from "@/components/WriteReviewButton";
import { getSession } from "@/lib/auth/session";
import { getProduct } from "@/lib/data/catalog";
import { listReviews } from "@/lib/data/engagement";
import { FALLBACK_IMAGE } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/products/[productId]/reviews">): Promise<Metadata> {
  const product = await getProduct((await params).productId);
  return product ? { title: `Reviews of ${product.name}` } : {};
}

export default async function ProductReviewsPage({ params }: PageProps<"/products/[productId]/reviews">) {
  const { productId } = await params;
  const product = await getProduct(productId);
  if (!product) notFound();

  const [user, reviews] = await Promise.all([getSession(), listReviews(product.id)]);

  return (
    <>
      <header className="reviews-header">
        <div className="reviews-header__image">
          <Image src={product.img ?? FALLBACK_IMAGE} alt="" fill sizes="96px" />
        </div>
        <div>
          <p className="eyebrow">Reviews</p>
          <h1>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h1>
          <p className="muted">
            <Link href={`/brands/${product.brand.id}`}>{product.brand.name}</Link>
          </p>
        </div>
      </header>

      <div className="reviews-layout">
        <aside className="stack">
          <ReviewBreakdown counts={product.reviewCounts} />
          <WriteReviewButton productId={product.id} productName={product.name} signedIn={Boolean(user)} />
        </aside>
        <ReviewList reviews={reviews} currentUserId={user?.id ?? null} />
      </div>
    </>
  );
}
