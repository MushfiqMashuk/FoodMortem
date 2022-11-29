import { useEffect } from "react";
import { useState } from "react";
import checkReviewType from "../../helpers/checkReviewType";
import useRatingStore from "../../store/useRatingStore";
import RatingComponent from "../RatingComponent";
import styles from "./reviewAnalytics.module.scss";

function ReviewAnalytics({ product }) {
  const { ratings, reviews } = product;

  const [userReviews, setUserReviews] = useState(reviews);
  const reviewState = useRatingStore((state) => state.reviews);

  useEffect(() => {
    setUserReviews(reviewState);
  }, [reviewState]);

  const reviewObject = checkReviewType(userReviews);

  return (
    <>
      {product && (
        <div className={styles.review_analytics}>
          <h1 className={styles.review_header}>
            Reviews{" "}
            <span className={styles.total_review}>({userReviews?.length})</span>
          </h1>
          <h3>
            Positive{" "}
            <span className={styles.total_review}>
              ({reviewObject?.positive}%)
            </span>
          </h3>
          <div className={styles.progress_bar_container}>
            <div className={styles.progress_bar}>
              <span
                className={`${styles.percentage}`}
                style={{ width: `${reviewObject?.positive}%` }}
              ></span>
            </div>
          </div>

          <h3>
            Moderate{" "}
            <span className={styles.total_review}>
              ({reviewObject?.moderate}%)
            </span>
          </h3>
          <div className={styles.progress_bar_container}>
            <div className={styles.progress_bar}>
              <span
                className={`${styles.percentage}`}
                style={{ width: `${reviewObject.moderate}%` }}
              ></span>
            </div>
          </div>
          <h3>
            Negative{" "}
            <span className={styles.total_review}>
              ({reviewObject?.negative}%)
            </span>
          </h3>

          <div className={styles.progress_bar_container}>
            <div className={styles.progress_bar}>
              <span
                className={`${styles.percentage}`}
                style={{ width: `${reviewObject.negative}%` }}
              ></span>
            </div>
          </div>
          <RatingComponent
            productRating={product?.averageRating}
            productName={product?.name}
            totalRating={ratings?.length}
            productId={product?._id}
          />
        </div>
      )}
    </>
  );
}

export default ReviewAnalytics;
