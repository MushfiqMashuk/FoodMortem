import { useState } from "react";
import useRatingStore from "../../store/useRatingStore";
import RadioButton from "../RadioButton";
import StarRatingComponent from "../StarRatingComponent";
import styles from "./reviewForm.module.scss";

const ReviewForm = ({ productName }) => {
  const [error, setError] = useState(true);
  const rating = useRatingStore((state) => state.rating);

  return (
    <div className={styles.container}>
      {productName && productName.length > 0 && (
        <div className={styles.product_name}>{productName}</div>
      )}
      <form className={styles.form}>
        <p>
          Your Rating <span className="required">*</span>
        </p>
        <StarRatingComponent reviewForm={true} initialRating={rating} />
        <div className={styles.radio_button_container}>
          <p className={styles.review_type}>
            Review Type <span className="required">*</span>
          </p>
          <RadioButton options={["good", "moderate", "bad"]} />
          {error && <p className="error_message">Error Message</p>}
        </div>
        <div className={styles.title}>
          <p className={styles.review_title}>
            Review Title <span className="required">*</span>
          </p>
          <input
            type="text"
            placeholder="Write your title here"
            className={styles.title_input}
            required
          />
          {error && <p className="error_message">Error Message</p>}
        </div>
        <div className={styles.review}>
          <textarea
            cols="30"
            rows="10"
            placeholder="Write your review here"
            className={styles.review_input}
            required
          ></textarea>
          {error && <p className="error_message">Error Message</p>}
        </div>
        <div className={styles.button_container}>
          <button type="submit" className={styles.submit_button}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
