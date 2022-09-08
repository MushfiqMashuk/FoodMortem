import Image from "next/image";
import { useState } from "react";
import ReactStars from "react-stars";
import StarIcon from "../../public/star_icon2.svg";
import styles from "./ratingComponent.module.scss";

function RatingComponent() {
  const [rating, setRating] = useState(false);

  const ratingChange = (newRating) => {
    console.log(newRating);
  };

  return (
    <div className={styles.container}>
      <div className={styles.rating}>
        <div className={styles.rating_title}>Rating</div>
        <div className={styles.rating_points}>
          <div className={styles.star}>
            <Image src={StarIcon} height={40} width={40} />
          </div>
          <div className={styles.stats}>
            <div className={styles.total_rating}>
              <span className={styles.the_rating}>8.7</span>
              <span>/</span>
              <span>10</span>
            </div>
            <div className={styles.total_number_of_rate}>123K</div>
          </div>
        </div>
      </div>
      <div className={styles.your_rating}>
        <div className={styles.rating_title}>Your Rating</div>
        <div className={styles.rating_points}>
          <div className={styles.star}>
            <Image src={StarIcon} height={40} width={40} />
          </div>
          <div className={styles.stats}>
            <div className={styles.total_rating}>
              <span>8.0</span>
              <span>/</span>
              <span>10</span>
            </div>
            <ReactStars
              count={10}
              size={30}
              color1={"#64A1F0"}
              color2={"#ffd700"}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingComponent;
