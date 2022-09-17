import { useState } from "react";
import StarRating from "react-svg-star-rating";
import styles from "./starRatingComponent.module.scss";

const StarRatingComponent = ({ title = "Rate This", onClose }) => {
  const [rating, setRating] = useState(0);

  const handleRate = () => {
    // Send rating to the database

    // Set rating to local state
    setRating(rating);

    console.log(rating);
    // close the modal
    onClose();
  };

  const handleRemoveRating = () => {
    // Remove rating from the database

    // Remove rating from the local state

    //close the modal
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.rating_title}>{title}</div>

      <div className={styles.rating_value}>{rating}</div>

      <StarRating
        unit="half"
        count={10}
        size={35}
        emptyColor="#DDDDDD"
        starClassName={styles.star_class}
        activeColor="#ffb700"
        hoverColor="red"
        innerRadius={25}
        handleOnClick={(rate) => setRating(rate)}
        initialRating={rating}
      />
      <button
        disabled={!rating}
        className={styles.rate_button}
        onClick={handleRate}
      >
        Rate
      </button>
      {rating ? (
        <button onClick={handleRemoveRating} className={styles.rate_button}>
          Remove Rating
        </button>
      ) : null}
    </div>
  );
};

export default StarRatingComponent;
