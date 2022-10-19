import { useState } from "react";
import StarRating from "react-svg-star-rating";
import useRatingStore from "../../store/useRatingStore";
import styles from "./starRatingComponent.module.scss";

const StarRatingComponent = ({
  name = "Rate This",
  onClose,
  initialRating,
  reviewForm = false,
}) => {
  const [userRating, setUserRating] = useState(initialRating);

  const [rating, setRating, removeRating] = useRatingStore((state) => [
    state.rating,
    state.setRating,
    state.removeRating,
  ]);

  const handleRate = () => {
    // Send rating to the database

    // Set rating to local state
    setRating(userRating);

    // close the modal
    onClose();
  };

  const handleRemoveRating = () => {
    // Remove rating from the database

    // Remove rating from the local state
    removeRating();
    //close the modal
    onClose();
  };

  return (
    <div
      className={reviewForm ? styles.container_review_form : styles.container}
    >
      {!reviewForm && <div className={styles.rating_title}>{name}</div>}
      <div
        className={
          reviewForm ? styles.rating_value_review_form : styles.rating_value
        }
      >
        {userRating}
      </div>

      <StarRating
        unit="half"
        count={10}
        size={reviewForm ? 30 : 35}
        emptyColor="#DDDDDD"
        starClassName={styles.star_class}
        activeColor="#ffb700"
        hoverColor="red"
        innerRadius={25}
        handleOnClick={(rate) => setUserRating(rate)}
        initialRating={userRating}
      />
      {!reviewForm && (
        <button
          disabled={initialRating === userRating}
          className={styles.rate_button}
          onClick={handleRate}
        >
          Rate
        </button>
      )}
      {!reviewForm && rating ? (
        <button onClick={handleRemoveRating} className={styles.rate_button}>
          Remove Rating
        </button>
      ) : null}
    </div>
  );
};

export default StarRatingComponent;
