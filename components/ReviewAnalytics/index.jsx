import checkReviewType from "../../helpers/checkReviewType";
import checkUserLogin from "../../helpers/checkUserLogin";
import RatingComponent from "../RatingComponent";
import styles from "./reviewAnalytics.module.scss";

function ReviewAnalytics({ product }) {
  const { ratings, reviews } = product;
  const loggedInUser = checkUserLogin();

  const reviewObject = checkReviewType(reviews);
  console.log(reviewObject);

  return (
    <>
      {product && (
        <div className={styles.review_analytics}>
          <h1 className={styles.review_header}>
            Reviews{" "}
            <span className={styles.total_review}>({reviews.length})</span>
          </h1>
          <h3>
            Positive{" "}
            <span className={styles.total_review}>({reviewObject?.good}%)</span>
          </h3>
          <div className={styles.progress_bar_container}>
            <div className={styles.progress_bar}>
              <span
                className={`${styles.percentage}`}
                style={{ width: `${reviewObject.good}%` }}
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
            <span className={styles.total_review}>({reviewObject?.bad}%)</span>
          </h3>

          <div className={styles.progress_bar_container}>
            <div className={styles.progress_bar}>
              <span
                className={`${styles.percentage}`}
                style={{ width: `${reviewObject.bad}%` }}
              ></span>
            </div>
          </div>
          <RatingComponent
            productRating={product?.averageRating}
            productName={product?.name}
            totalRating={product?.ratings?.length}
          />
        </div>
      )}
    </>
  );
}

export default ReviewAnalytics;
