import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BucketListButton } from "@/components/BucketListButton";
import { ProductCollection } from "@/components/ProductCollection";
import { RatingPanel } from "@/components/RatingPanel";
import { ReviewBreakdown } from "@/components/ReviewBreakdown";
import { ReviewList } from "@/components/ReviewList";
import { WriteReviewButton } from "@/components/WriteReviewButton";
import { getSession } from "@/lib/auth/session";
import { getProduct, listSimilarProducts } from "@/lib/data/catalog";
import { getUserRating, listReviews } from "@/lib/data/engagement";
import { getBucketListIds } from "@/lib/data/users";
import { FALLBACK_IMAGE } from "@/lib/images";

const LATEST_REVIEWS = 3;

export async function generateMetadata({ params }: PageProps<"/products/[productId]">): Promise<Metadata> {
  const product = await getProduct((await params).productId);
  return product
    ? { title: product.name, description: `Ratings and reviews of ${product.name} by ${product.brand.name}.` }
    : {};
}

export default async function ProductPage({ params }: PageProps<"/products/[productId]">) {
  const { productId } = await params;
  const product = await getProduct(productId);
  if (!product) notFound();

  const user = await getSession();
  const [reviews, similar, userRating, bucketIds] = await Promise.all([
    listReviews(product.id, { limit: LATEST_REVIEWS }),
    listSimilarProducts(product),
    user ? getUserRating(product.id, user.id) : null,
    user ? getBucketListIds(user.id) : new Set<string>(),
  ]);
  const totalReviews =
    product.reviewCounts.positive + product.reviewCounts.moderate + product.reviewCounts.negative;

  return (
    <>
      <header className="product-header">
        <div>
          <h1>{product.name}</h1>
          <p className="product-header__meta">
            <Link href={`/brands/${product.brand.id}`}>{product.brand.name}</Link>
            <span aria-hidden> · </span>
            <Link href={`/categories/${product.category.id}`}>{product.category.name}</Link>
          </p>
        </div>
        <BucketListButton productId={product.id} signedIn={Boolean(user)} initial={bucketIds.has(product.id)} />
      </header>

      <div className="product-layout">
        <div className="product-image">
          <Image src={product.img ?? FALLBACK_IMAGE} alt={product.name} fill priority sizes="(max-width: 800px) 100vw, 50vw" />
        </div>
        <div className="stack">
          <RatingPanel
            productId={product.id}
            averageRating={product.averageRating}
            ratingCount={product.ratingCount}
            userRating={userRating}
            signedIn={Boolean(user)}
          />
          <ReviewBreakdown counts={product.reviewCounts} />
        </div>
      </div>

      <section className="section">
        <div className="section__header">
          <h2>Latest reviews</h2>
          <WriteReviewButton productId={product.id} productName={product.name} signedIn={Boolean(user)} />
        </div>
        <ReviewList reviews={reviews} currentUserId={user?.id ?? null} />
        {totalReviews > LATEST_REVIEWS && (
          <p>
            <Link href={`/products/${product.id}/reviews`}>See all {totalReviews} reviews →</Link>
          </p>
        )}
      </section>

      <section className="section">
        <h2>Similar products</h2>
        <ProductCollection products={similar} layout="row" emptyMessage="No similar products yet." />
      </section>
    </>
  );
}
