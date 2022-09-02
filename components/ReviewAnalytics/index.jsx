import styles from "./reviewAnalytics.module.scss";

function ReviewAnalytics() {
  return (
    <div className={styles.review_analytics}>
      <h1>
        Reviews <span className={styles.total_review}>(150)</span>
      </h1>
      <h3>
        Positive Reviews <span className={styles.total_review}>(80)</span>
      </h3>

      <div className={styles.progress_bar_container}>
        <div className={styles.progress_bar}>
          <span className={`${styles.percentage} ${styles.c}`}></span>
        </div>
      </div>

      <h3>
        Moderate Reviews <span className={styles.total_review}>(40)</span>
      </h3>
      <div className={styles.progress_bar_container}>
        <div className={styles.progress_bar}>
          <span className={`${styles.percentage} ${styles.java}`}></span>
        </div>
      </div>
      <h3>
        Negative Reviews <span className={styles.total_review}>(30)</span>
      </h3>

      <div className={styles.progress_bar_container}>
        <div className={styles.progress_bar}>
          <span className={`${styles.percentage} ${styles.python}`}></span>
        </div>
      </div>
    </div>
  );
}

export default ReviewAnalytics;
