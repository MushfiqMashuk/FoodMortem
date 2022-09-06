import RatingComponent from "../RatingComponent";
import styles from "./reviewAnalytics.module.scss";

function ReviewAnalytics() {
  return (
    <div className={styles.review_analytics}>
      <h1 className={styles.review_header}>
        Reviews <span className={styles.total_review}>(150)</span>
      </h1>
      <h3>
        Positive <span className={styles.total_review}>(80)</span>
      </h3>

      <div className={styles.progress_bar_container}>
        <div className={styles.progress_bar}>
          <span className={`${styles.percentage} ${styles.positive}`}></span>
        </div>
      </div>

      <h3>
        Moderate <span className={styles.total_review}>(40)</span>
      </h3>
      <div className={styles.progress_bar_container}>
        <div className={styles.progress_bar}>
          <span className={`${styles.percentage} ${styles.moderate}`}></span>
        </div>
      </div>
      <h3>
        Negative <span className={styles.total_review}>(30)</span>
      </h3>

      <div className={styles.progress_bar_container}>
        <div className={styles.progress_bar}>
          <span className={`${styles.percentage} ${styles.negative}`}></span>
        </div>
      </div>
      <RatingComponent />
    </div>
  );
}

export default ReviewAnalytics;
