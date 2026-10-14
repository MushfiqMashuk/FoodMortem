import type { Review } from "@/lib/data/types";
import { DeleteReviewButton } from "./DeleteReviewButton";
import { EmptyState } from "./EmptyState";

const dateFormat = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export function ReviewList({ reviews, currentUserId }: { reviews: Review[]; currentUserId: string | null }) {
  if (reviews.length === 0) {
    return <EmptyState>No reviews yet. Be the first to share your verdict!</EmptyState>;
  }

  return (
    <ul className="review-list">
      {reviews.map((review) => (
        <li key={review.id} className={`card review review--${review.type}`}>
          <header className="review__header">
            <div>
              <p className="review__author">{review.userName}</p>
              <p className="muted">
                <time dateTime={review.createdAt}>{dateFormat.format(new Date(review.createdAt))}</time>
                {" · "}
                <span className={`tag tag--${review.type}`}>{review.type}</span>
              </p>
            </div>
            {review.rating !== null && (
              <p className="rating-badge" aria-label={`Rated ${review.rating} out of 10`}>
                <span aria-hidden>★</span> {review.rating}/10
              </p>
            )}
          </header>
          <p className="review__body">{review.body}</p>
          {review.userId === currentUserId && <DeleteReviewButton reviewId={review.id} />}
        </li>
      ))}
    </ul>
  );
}
