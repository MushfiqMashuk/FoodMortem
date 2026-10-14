import Image from "next/image";
import { useEffect, useState } from "react";
import checkUserLogin from "../../helpers/checkUserLogin";
import getDate from "../../helpers/getDate";
import StarIcon from "../../public/star_icon6.svg";
import useRatingStore from "../../store/useRatingStore";
import NotRated from "../NotRated";
import styles from "./reviewCard.module.scss";

function ReviewCard({ userReview, page, rating, currentUserRating, productId }) {
  let loggedInUser;
  let typeColor;

  const [cardRating, setCardRating] = useState(rating);
  const [productReview, setProductReview] = useState(userReview);
  const [showDelete, setShowDelete] = useState(false);
  const [reviews, setReviews] = useRatingStore((state) => [
    state.reviews,
    state.setReviews,
  ]);
  const { name, review, type, date, userId, _id } = productReview;

  switch (type) {
    case "positive":
      typeColor = "aquamarine";
      break;
    case "moderate":
      typeColor = "grey";
      break;
    case "negative":
      typeColor = "#FF0000";
      break;
    default:
      typeColor = "aquamarine";
      break;
  }

  useEffect(() => {
    loggedInUser = checkUserLogin();
    if (loggedInUser.userId == userId) {
      setCardRating(currentUserRating);
    }
  }, [currentUserRating]);

  useEffect(() => {
    loggedInUser = checkUserLogin();

    if (loggedInUser.userId === userId) {
      setShowDelete(true);
    }
  }, [loggedInUser]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/review`,
        {
          method: "DELETE",
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            reviewId: _id,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Set review to the local state
        setProductReview(data);
        setReviews(data);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        ) : (
          <NotRated />
        )}
      </div>
      <div className={styles.date}>{parsedDate && parsedDate}</div>
      <div className={styles.body}>
        <div className={styles.type} style={{ backgroundColor: typeColor }}>
          <div>
            <p>{type}</p>
          </div>
        </div>
        <div className={styles.main_content}>
          <p>{review}</p>
        </div>
        <div className={styles.footer}>
          {showDelete && <button onClick={handleDelete} className={styles.delete_button}>Delete review</button>}
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
