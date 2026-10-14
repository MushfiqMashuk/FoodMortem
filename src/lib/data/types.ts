import type { ReviewBreakdown, ReviewType } from "@/lib/domain";

/*
 * Plain, serialisable view models handed to components. Server Components can
 * pass these straight to Client Components (no ObjectId or Date instances).
 */

export interface Ref {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  img: string | null;
  brand: Ref;
  category: Ref;
  tags: string[];
  averageRating: number | null;
  ratingCount: number;
  reviewCounts: ReviewBreakdown;
}

export interface Brand {
  id: string;
  name: string;
  img: string | null;
}

export interface Category {
  id: string;
  name: string;
  img: string | null;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  type: ReviewType;
  body: string;
  /** ISO timestamp */
  createdAt: string;
  /** The reviewer's own rating of the product, if they rated it. */
  rating: number | null;
}
