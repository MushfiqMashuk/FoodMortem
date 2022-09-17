import Image from "next/image";
import { useState } from "react";
import StarIcon from "../../public/star_icon6.svg";
import YourRatingIconAfter from "../../public/your_rating_star_after.svg";
import YourRatingIconBefore from "../../public/your_rating_star_before.svg";
import Modal from "../Modal";
import StarRatingComponent from "../StarRatingComponent";
import styles from "./ratingComponent.module.scss";

function RatingComponent({ productRating }) {
  const [rating, setRating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch the user rating from the database, if there's any. Else userRating = 0

  return (
    <>
      {showModal && (
        <Modal title="Rate This" onClose={() => setShowModal(false)}>
          <StarRatingComponent
            title="Kolkata Kacchi" // Here title will be dynamic
            onClose={() => setShowModal(false)}
            userRating={0}
          />
        </Modal>
      )}
      {productRating && (
        <div className={styles.container}>
          <div className={styles.rating}>
            <div className={styles.rating_title}>Rating</div>
            <div className={styles.rating_points}>
              <div className={styles.star}>
                <Image src={StarIcon} height={38} width={38} />
              </div>
              <div className={styles.stats}>
                <div className={styles.total_rating}>
                  <span className={styles.the_rating}>{productRating}</span>
                  <span>/</span>
                  <span>10</span>
                </div>
                <div className={styles.total_number_of_rate}>123K</div>
              </div>
            </div>
          </div>
          <div
            className={styles.your_rating}
            onClick={() => setShowModal(true)}
          >
            <div className={styles.rating_title}>Your Rating</div>
            <div
              className={styles.rating_points}
              onClick={() => setRating(!rating)}
            >
              <div className={styles.star}>
                <Image
                  src={rating ? YourRatingIconAfter : YourRatingIconBefore}
                  height={38}
                  width={38}
                />
              </div>
              <div className={styles.stats}>
                {rating ? (
                  <div className={styles.total_rating}>
                    <span className={styles.the_rating}>9.5</span>
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
