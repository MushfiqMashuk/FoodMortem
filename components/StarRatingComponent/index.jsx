import { useState } from "react";
import StarRating from "react-svg-star-rating";
import styles from "./starRatingComponent.module.scss";

const StarRatingComponent = ({ title = "Rate This", onClose }) => {
  const [rating, setRating] = useState(0);

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
      />
      <button className={styles.rate_button} onClick={onClose}>
        Rate
      </button>
      {rating ? (
        <button
          disabled={!rating}
          onClick={() => setRating(0)}
          className={styles.rate_button}
        >
          Remove Rating
        </button>
      ) : null}
    </div>
  );
};

export default StarRatingComponent;
