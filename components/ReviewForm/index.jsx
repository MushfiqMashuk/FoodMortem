import styles from "./reviewForm.module.scss";

const ReviewForm = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.title}>
          <p>Review Title</p>
          <input
            type="text"
            placeholder="Write your title here"
            className={styles.title_input}
          />
          <p>Error Message</p>
        </div>
        <div className={styles.review}>
          <textarea
            cols="30"
            rows="10"
            placeholder="Write your review here"
            className={styles.review_input}
          ></textarea>
          <p>Error Message</p>
        </div>
        <div className={styles.button_container}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
