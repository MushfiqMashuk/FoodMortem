import { useState } from "react";
import StarRating from "react-svg-star-rating";
import styles from "./starRatingComponent.module.scss";
import useRating from "../../hooks/useRating";

const StarRatingComponent = ({ title = "Rate This", onClose }) => {
  //const [rating, setRating] = useState(0);
  const {userRating, setUserRating} = useRating(0);

  const handleRate = () => {
    // Send rating to the database

    // Set rating to local state
    setUserRating(userRating);

    console.log(userRating);
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
      <button className={styles.rate_button} onClick={handleRate}>
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
