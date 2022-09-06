import Image from "next/image";
import styles from "./ratingComponent.module.scss";
import StarIcon from "../../public/star_icon2.svg"

function RatingComponent() {
  return (
    <div className={styles.container}>
      <div className={styles.rating}>
        <div className={styles.rating_title}>
          <h3>Rating</h3>
        </div>
        <div>
          <Image src={StarIcon} height={30} width={30} />
        </div>
      </div>
      <div className={styles.your_rating}></div>
    </div>
  );
}

export default RatingComponent;
