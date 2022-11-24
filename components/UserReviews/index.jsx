import Link from "next/link";
import randomNumber from "../../helpers/randomNumber";
import ReviewCard from "../ReviewCard";
import styles from "./userReviews.module.scss";

function UserReviews({ reviews = [], productId, ratings = [] }) {
  return (
    <div className={styles.container}>
      <div className={styles.top_section}>
        <h2 className={styles.heading_title}>User Reviews</h2>
        <Link href={`/products/${productId}/reviews`}>
          <a className="see_all">See all reviews</a>
        </Link>
      </div>
      <div className={styles.body}>
        {reviews &&
          reviews.map((review, i) => {
            const user = ratings.find(
              (rating) => rating.userId == review.userId
            );

            return (
              <ReviewCard
                key={randomNumber(Date.now())}
                userReview={review}
                rating={user ? user.rating : null}
              />
            );
          })}
      </div>
    </div>
  );
}

export default UserReviews;
