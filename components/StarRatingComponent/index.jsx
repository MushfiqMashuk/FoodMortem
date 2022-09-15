import StarRating from "react-svg-star-rating";
import styles from "./starRatingComponent.module.scss";

const StarRatingComponent = ({ title = "Rate This" }) => {
  return (
    <div className={styles.container}>
      <div className={styles.rating_title}>{title}</div>

      <div className={styles.rating_value}>0</div>

      <StarRating
        unit="half"
        count={10}
        size={35}
        emptyColor="#DDDDDD"
        starClassName={styles.star_class}
        activeColor="#FFD700"
        hoverColor="red"
        innerRadius={25}
      />
      <button className={styles.rate_button}>Rate</button>
    </div>
  );
};

export default StarRatingComponent;
