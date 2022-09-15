import StarRating from "react-svg-star-rating";
import styles from "./starRatingComponent.module.scss";

const StarRatingComponent = ({ title = "Rate This" }) => {
  return (
    <div className={styles.container}>
      <div className={styles.rating_title}>{title}</div>
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
    </div>
  );
};

export default StarRatingComponent;
