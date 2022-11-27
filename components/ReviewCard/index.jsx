import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import checkUserLogin from "../../helpers/checkUserLogin";
import getDate from "../../helpers/getDate";
import StarIcon from "../../public/star_icon6.svg";
import NotRated from "../NotRated";
import styles from "./reviewCard.module.scss";

function ReviewCard({ userReview, page, rating, currentUserRating }) {
  const { name, review, type, date, userId } = userReview;

  const [cardRating, setCardRating] = useState(rating);

  useEffect(() => {
    const loggedInUser = checkUserLogin();

    if (loggedInUser.userId == userId) {
      setCardRating(currentUserRating);
    }
  }, [currentUserRating]);

  const parsedDate = getDate(date);

  return (
    <div
      className={
        page === "reviews"
          ? styles.container_for_reviews_page
          : styles.container
      }
    >
      <div className={styles.top_section}>
        <div className={styles.name}>
          <p>{name}</p>
        </div>
        {cardRating ? (
          <div className={styles.rating}>
            <Image src={StarIcon} width={16} height={16} />
            <div className={styles.rating_value}>
              <span className={styles.the_rating}>{cardRating}</span>
              <span>/</span>
              <span>10</span>
            </div>
          </div>
        ) : <NotRated />}
      </div>
      <div className={styles.date}>{parsedDate && parsedDate}</div>
      <div className={styles.body}>
        <div className={styles.type}>
          <div>
            <p>{type}</p>
          </div>
        </div>
        <div className={styles.main_content}>
          <p>{review}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
