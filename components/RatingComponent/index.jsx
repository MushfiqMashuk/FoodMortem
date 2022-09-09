import Image from "next/image";
import { useState } from "react";
import StarIcon from "../../public/star_icon6.svg";
import YourRatingIconAfter from "../../public/your_rating_star_after.svg";
import YourRatingIconBefore from "../../public/your_rating_star_before.svg";
import styles from "./ratingComponent.module.scss";

function RatingComponent() {
  const [rating, setRating] = useState(false);

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
            <Image
              src={rating ? YourRatingIconAfter : YourRatingIconBefore}
              height={40}
              width={40}
              onClick={() => setRating(!rating)}
            />
            {rating ? (
              <div className={styles.stats}>
                <div className={styles.total_rating}>
                  <span className={styles.the_rating}>8.0</span>
                  <span>/</span>
                  <span>10</span>
                </div>
              </div>
            ) : (
              <h3>Rate</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingComponent;
