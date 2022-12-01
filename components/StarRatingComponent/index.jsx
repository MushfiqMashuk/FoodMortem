import { useState } from "react";
import StarRating from "react-svg-star-rating";
import useRatingStore from "../../store/useRatingStore";
import styles from "./starRatingComponent.module.scss";

const StarRatingComponent = ({
  name = "Rate This",
  onClose,
  initialRating,
  reviewForm = false,
  setError,
  productId,
  userId,
  userName,
}) => {
  const [userRating, setUserRating] = useState(initialRating);

  const [rating, setRating, removeRating] = useRatingStore((state) => [
    state.rating,
    state.setRating,
    state.removeRating,
  ]);

  const handleSetRating = async (myRating) => {
    setUserRating(myRating);

    // If the form is review form then do the handle rate here
    // if (reviewForm) {
    //   // Send rating to the database

    //   if (rating) {
    //     try {
    //       const response = await fetch(
    //         `${process.env.NEXT_PUBLIC_API_URL}/rate`,
    //         {
    //           method: "PUT",
    //           headers: {
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             productId,
    //             userId,
    //             userRating,
    //           }),
    //         }
    //       );

    //       if (response.ok) {
    //         const data = await response.json();
    //         // Set rating to the local state
    //         setRating(myRating);

    //         // set the error object.
    //         setError(false);
    //       } else {
    //         throw new Error("Something went wrong!");
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   } else {
    //     try {
    //       const response = await fetch(
    //         `${process.env.NEXT_PUBLIC_API_URL}/rate?productId=${productId}`,
    //         {
    //           method: "PATCH",
    //           headers: {
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify({
    //             userId,
    //             name: userName,
    //             rating: userRating,
    //           }),
    //         }
    //       );

    //       if (response.ok) {
    //         const data = await response.json();
    //         // Set rating to the local state
    //         setRating(myRating);

    //         // set the error object.
    //         setError(false);
    //       } else {
    //         throw new Error("Something went wrong!");
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    // }
  };

  const handleRate = async () => {
    // Send rating to the database

    if (rating) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/rate`,
          {
            method: "PUT",
            headers: {
              // 'Content-Type': 'application/x-www-form-urlencoded',
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId,
              userId,
              userRating,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Set rating to local state
          setRating(userRating);
        } else {
          throw new Error("Something went wrong!");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/rate?productId=${productId}`,
          {
            method: "PATCH",
            headers: {
              // 'Content-Type': 'application/x-www-form-urlencoded',
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              name: userName,
              rating: userRating,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Set rating to local state
          setRating(userRating);
        } else {
          throw new Error("Something went wrong!");
        }
      } catch (err) {
        console.log(err);
      }
    }

    // close the modal
    onClose();
  };

  const handleRemoveRating = async () => {
    // Remove rating from the database

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rate`, {
        method: "DELETE",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Remove rating from the local state
        removeRating();
        //close the modal
        onClose();
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={reviewForm ? styles.container_review_form : styles.container}
    >
      {!reviewForm && <div className={styles.rating_title}>{name}</div>}
      <div
        className={
          reviewForm ? styles.rating_value_review_form : styles.rating_value
        }
      >
        {userRating}
      </div>

      <StarRating
        unit="half"
        count={10}
        size={reviewForm ? 30 : 35}
        emptyColor="#DDDDDD"
        starClassName={styles.star_class}
        activeColor="#ffb700"
        hoverColor="red"
        innerRadius={25}
        handleOnClick={handleSetRating}
        initialRating={userRating}
      />
      {!reviewForm && (
        <button
          disabled={initialRating === userRating}
          className={styles.rate_button}
          onClick={handleRate}
        >
          Rate
        </button>
      )}
      {!reviewForm && rating ? (
        <button onClick={handleRemoveRating} className={styles.rate_button}>
          Remove Rating
        </button>
      ) : null}
    </div>
  );
};

export default StarRatingComponent;
