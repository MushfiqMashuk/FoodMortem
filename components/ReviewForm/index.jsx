import RadioButton from "../RadioButton";
import styles from "./reviewForm.module.scss";

const ReviewForm = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <RadioButton options={["good", "moderate", "bad"]} />

        <div className={styles.title}>
          <p>
            Review Title <span className="required">*</span>
          </p>
          <input
            type="text"
            placeholder="Write your title here"
            className={styles.title_input}
            required
          />
          <p className="error_message">Error Message</p>
        </div>
        <div className={styles.review}>
          <textarea
            cols="30"
            rows="10"
            placeholder="Write your review here"
            className={styles.review_input + " error_class"}
            required
          ></textarea>
          <p className="error_message">Error Message</p>
        </div>
        <div className={styles.button_container}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
