import { useMemo, useState } from "react";
import useRatingStore from "../../store/useRatingStore";
import RadioButton from "../RadioButton";
import StarRatingComponent from "../StarRatingComponent";
import styles from "./reviewForm.module.scss";

const ReviewForm = ({ productName }) => {
  const [error, setError] = useState({
    ratingError: "",
    typeError: "",
    titleError: "",
    reviewError: "",
  });
  const [userReview, setUserReview] = useState("");
  const rating = useRatingStore((state) => state.rating);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) {
      setError((prev) => ({ ...prev, ratingError: "Please provide a rating" }));
    }
  };

  const { ratingError, typeError, titleError, reviewError } = error;

  //console.log(ratingError);

  return (
    <div className={styles.container}>
      {productName && productName.length > 0 && (
        <div className={styles.product_name}>{productName}</div>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.product_rating}>
          <p>
            Your Rating <span className="required">*</span>
          </p>
          {useMemo(
            () => (
              <StarRatingComponent
                reviewForm={true}
                initialRating={rating}
                setError={setError}
              />
            ),
            [rating]
          )}
          {ratingError && ratingError.length > 0 && (
            <p className="error_message">{ratingError}</p>
          )}
        </div>
        <div className={styles.radio_button_container}>
          <p className={styles.review_type}>
            Review Type <span className="required">*</span>
          </p>
          {useMemo(
            () => (
              <RadioButton options={["good", "moderate", "bad"]} />
            ),
            []
          )}
          {typeError && typeError.length > 0 && (
            <p className="error_message">{typeError}</p>
          )}
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
          {titleError && titleError.length > 0 && (
            <p className="error_message">{titleError}</p>
          )}
        </div>
        <div className={styles.review}>
          <textarea
            cols="30"
            rows="10"
            placeholder="Write your review here"
            className={styles.review_input}
            required
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
          ></textarea>
          {reviewError && reviewError.length > 0 && (
            <p className="error_message">{reviewError}</p>
          )}
        </div>
        <div className={styles.button_container}>
          <button
            type="submit"
            className={"submit_button"}
            disabled={!userReview}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
