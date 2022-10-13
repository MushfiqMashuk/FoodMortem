import styles from "./reviewForm.module.scss";

const ReviewForm = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.review_type}>
          <p>Please select your review type</p> {" "}
          <input
            type="radio"
            id="positive"
            name="review_type"
            value="positive"
          />
            <label for="positive">Positive</label>
          <br /> {" "}
          <input
            type="radio"
            id="moderate"
            name="review_type"
            value="moderate"
          />
            <label for="moderate">Moderate</label>
          <br /> {" "}
          <input
            type="radio"
            id="negative"
            name="review_type"
            value="negative"
          />
            <label for="negative">Negative</label>
        </div>
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
