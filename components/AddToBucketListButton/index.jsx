import { useEffect, useState } from "react";
import checkUserLogin from "../../helpers/checkUserLogin";
import PlusSign from "../HelperComponents/PlusSign";
import TickSign from "../HelperComponents/TickSign";
import LoginPrompt from "../LoginPrompt";
import Modal from "../Modal";
import styles from "./addToBucketListButton.module.scss";

function AddToBucketListButton({ children, product }) {
  const [isInBucket, setIsInBucket] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let loggedInUser;

  useEffect(() => {
    loggedInUser = checkUserLogin();
  });

  const handleAddBucketList = async () => {
    // set loading true
    // send the item to the database

    if (!loggedInUser) {
      setShowModal(true);
    } else {
      const { _id, name, brand, category } = product;

      const bucketListObject = {
        productId: _id,
        productName: name.trim().toLowerCase(),
        brand: {
          id: brand.id,
          name: brand.name,
        },
        category: {
          id: category.id,
          name: category.name,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bucketList?userId=${loggedInUser.userId}`,
          {
            method: "PATCH",
            headers: {
              // 'Content-Type': 'application/x-www-form-urlencoded',
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bucketListObject),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // set the local state
          setIsInBucket(true);
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleRemoveBucketList = async () => {
    if (!loggedInUser) {
      setShowModal(true);
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bucketList?userId=${loggedInUser.userId}`,
          {
            method: "DELETE",
            headers: {
              // 'Content-Type': 'application/x-www-form-urlencoded',
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productId: product._id,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // set the local state
          setIsInBucket(false);
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.bucket_list}>
      {showModal && !loggedInUser && (
        <Modal
          title={loggedInUser ? "Rate this" : "Please Signin"}
          onClose={() => setShowModal(false)}
        >
          {
            <LoginPrompt
              promptText="You are not signed in. Please sign in to rate your favourite food."
              firstButtonText="Sign In here"
              secondButtonText="Sign Up here"
            />
          }
        </Modal>
      )}
      <div
        className={styles.bucket_list_button}
        onClick={isInBucket ? handleRemoveBucketList : handleAddBucketList}
      >
        <div className={styles.plus}>
          {isInBucket ? <TickSign /> : <PlusSign />}
        </div>
        <div className={styles.button_title}>
          {isInBucket ? "Remove Item" : children}
        </div>
      </div>
    </div>
  );
}

export default AddToBucketListButton;
