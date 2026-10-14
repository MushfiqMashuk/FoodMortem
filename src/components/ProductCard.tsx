import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data/types";
import { formatRating } from "@/lib/domain";
import { FALLBACK_IMAGE } from "@/lib/images";
import { BucketListButton } from "./BucketListButton";

interface ProductCardProps {
  product: Product;
  signedIn: boolean;
  inBucketList: boolean;
  /** Hide the brand or category link when the page is already scoped to it. */
  hide?: "brand" | "category";
}

export function ProductCard({ product, signedIn, inBucketList, hide }: ProductCardProps) {
  const href = `/products/${product.id}`;
  return (
    <article className="card product-card">
      <Link href={href} className="product-card__image" tabIndex={-1} aria-hidden>
        <Image
          src={product.img ?? FALLBACK_IMAGE}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, 240px"
        />
      </Link>
      <div className="product-card__body">
        <p className="rating-badge" aria-label={`Rated ${formatRating(product.averageRating)} out of 10`}>
          <span aria-hidden>★</span> {formatRating(product.averageRating)}
          <span className="muted"> ({product.ratingCount})</span>
        </p>
        <h3 className="product-card__name">
          <Link href={href}>{product.name}</Link>
        </h3>
        <p className="product-card__meta">
          {hide !== "brand" && <Link href={`/brands/${product.brand.id}`}>{product.brand.name}</Link>}
          {hide === undefined && <span aria-hidden> · </span>}
          {hide !== "category" && (
            <Link href={`/categories/${product.category.id}`}>{product.category.name}</Link>
          )}
        </p>
        <BucketListButton productId={product.id} signedIn={signedIn} initial={inBucketList} compact />
      </div>
    </article>
  );
}
