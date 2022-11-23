import Image from "next/image";
import { useEffect, useState } from "react";
import checkUserLogin from "../../helpers/checkUserLogin";
import StarIcon from "../../public/star_icon6.svg";
import YourRatingIconAfter from "../../public/your_rating_star_after.svg";
import YourRatingIconBefore from "../../public/your_rating_star_before.svg";
import useRatingStore from "../../store/useRatingStore";
import LoginPrompt from "../LoginPrompt";
import Modal from "../Modal";
import StarRatingComponent from "../StarRatingComponent";
import styles from "./ratingComponent.module.scss";

function RatingComponent({
  productRating,
  productName,
  totalRating = 0,
  productId,
}) {
  const loggedInUser = checkUserLogin();
  const { userName, userId } = loggedInUser;

  const [showModal, setShowModal] = useState(false);
  const [averageRating, setAverageRating] = useState(productRating);
  const [numberOfratings, setNumberOfratings] = useState(totalRating);

  const rating = useRatingStore((state) => state.rating);

  useEffect(() => {
    const getAverageRating = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/averageRating?productId=${productId}`
        );

        const data = await res.json();

        setAverageRating(data.averageRating);
        setNumberOfratings(data.ratings.length);
      } catch (err) {
        console.log(err);
      }
    };

    getAverageRating();
  }, [rating]);

  // Fetch the user rating from the database, if there's any. Else userRating = 0

  return (
    <>
      {showModal && (
        <Modal
          title={loggedInUser ? "Rate this" : "Please Signin"}
          onClose={() => setShowModal(false)}
        >
          {loggedInUser ? (
            <StarRatingComponent
              name={productName} // Here title will be dynamic
              onClose={() => setShowModal(false)}
              initialRating={rating}
              productId={productId}
              userId={userId}
              userName={userName}
            />
          ) : (
            <LoginPrompt
              promptText="You are not signed in. Please sign in to rate your favourite food."
              firstButtonText="Sign In here"
              secondButtonText="Sign Up here"
            />
          )}
        </Modal>
      )}
      {productRating && (
        <div className={styles.container}>
          <div className={styles.bar}></div>
          <div className={styles.rating}>
            <div className={styles.rating_title}>Rating</div>
            <div className={styles.rating_points}>
              <div className={styles.star}>
                <Image src={StarIcon} height={38} width={38} />
              </div>
              <div className={styles.stats}>
                <div className={styles.total_rating}>
                  <span className={styles.the_rating}>{averageRating}</span>
                  <span>/</span>
                  <span>10</span>
                </div>
                <div className={styles.total_number_of_rate}>
                  {numberOfratings}
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.your_rating}
            onClick={() => setShowModal(true)}
          >
            <div className={styles.rating_title}>Your Rating</div>
            <div className={styles.rating_points}>
              <div className={styles.star}>
                <Image
                  src={rating ? YourRatingIconAfter : YourRatingIconBefore}
                  height={38}
                  width={38}
                  priority={true}
                />
              </div>
              <div className={styles.stats}>
                {rating ? (
                  <div className={styles.total_rating}>
                    <span className={styles.the_rating}>{rating}</span>
                    <span>/</span>
                    <span>10</span>
                  </div>
                ) : (
                  <h3 className={styles.the_rating}>Rate</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RatingComponent;
