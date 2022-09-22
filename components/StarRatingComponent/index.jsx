import { useState } from "react";
import StarRating from "react-svg-star-rating";
import useRatingStore from "../store/useRatingStore";
import styles from "./starRatingComponent.module.scss";

const StarRatingComponent = ({
  title = "Rate This",
  onClose,
  initialRating,
}) => {
  const [userRating, setUserRating] = useState(initialRating);

  const [rating, setRating, removeRating] = useRatingStore((state) => [
    state.setRating,
    state.removeRating,
    state.rating,
  ]);

  //console.log(rating);

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
    <div className={styles.container}>
      <div className={styles.rating_title}>{title}</div>

      <div className={styles.rating_value}>{userRating}</div>

      <StarRating
        unit="half"
        count={10}
        size={35}
        emptyColor="#DDDDDD"
        starClassName={styles.star_class}
        activeColor="#ffb700"
        hoverColor="red"
        innerRadius={25}
        handleOnClick={(rate) => setUserRating(rate)}
        initialRating={userRating}
      />
      <button
        disabled={!userRating}
        className={styles.rate_button}
        onClick={handleRate}
      >
        Rate
      </button>
      {userRating ? (
        <button onClick={handleRemoveRating} className={styles.rate_button}>
          Remove Rating
        </button>
      ) : null}
    </div>
  );
};

export default StarRatingComponent;
