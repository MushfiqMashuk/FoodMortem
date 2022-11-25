import { useMemo, useState } from "react";
import checkUserLogin from "../../helpers/checkUserLogin";
import useRatingStore from "../../store/useRatingStore";
import RadioButton from "../RadioButton";
import styles from "./reviewForm.module.scss";

const ReviewForm = ({ productName, productId, onClose }) => {
  const loggedInUser = checkUserLogin();

  const { userName, userId } = loggedInUser;

  const [error, setError] = useState({
    typeError: "",
    reviewError: "",
  });
  const [userReview, setUserReview] = useState("");
  const [radioButtonValue, setRadioButtonValue] = useState(null);
  const setReviews = useRatingStore((state) => state.setReviews);

  const handleSubmit = (e) => {
    // preventing the default behaviour (reloading) of the form
    e.preventDefault();

    // submit the form
    formSubmit();
  };

  const formSubmit = async () => {
    const reviewObject = {
      userId,
      name: userName.trim(),
      type: radioButtonValue.trim(),
      review: userReview,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review?productId=${productId}`,
        {
          method: "PATCH",
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewObject),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setReviews(data.reviews);

        onClose();
      } else {
        setError((prev) => ({
          ...prev,
          reviewError: "Can not review now!",
        }));
      }
    } catch (err) {
      setError((prev) => ({
        ...prev,
        reviewError: "Internal server error!",
      }));
    }
  };

  const { typeError, reviewError } = error;

  return (
    <div className={styles.container}>
      {productName && productName.length > 0 && (
        <div className={styles.product_name}>{productName}</div>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* <div className={styles.product_rating}>
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
        </div> */}
        <div className={styles.radio_button_container}>
          <p className={styles.review_type}>
            Review Type <span className="required">*</span>
          </p>
          {useMemo(
            () => (
              <RadioButton
                options={["positive", "moderate", "negative"]}
                callback={(value) => setRadioButtonValue(value)}
              />
            ),
            []
          )}
          {typeError && typeError.length > 0 && (
            <p className="error_message">{typeError}</p>
          )}
        </div>
        {/* <div className={styles.title}>
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
        </div> */}
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
