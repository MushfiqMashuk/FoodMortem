import { useState } from "react";
import PlusSign from "../HelperComponents/PlusSign";
import TickSign from "../HelperComponents/TickSign";
import styles from "./addToBucketListButton.module.scss";

function AddToBucketListButton({ children }) {
  const [isInBucket, setIsInBucket] = useState(false);

  const handleAddBucketList = () => {
    // set loading true
    // send the item to the database

    // set the local state
    setIsInBucket(!isInBucket);
  };

  return (
    <div className={styles.bucket_list}>
      <div className={styles.bucket_list_button} onClick={handleAddBucketList}>
        <div className={styles.plus}>
          {isInBucket ? <TickSign /> : <PlusSign />}
        </div>
        <div className={styles.button_title}>
          {isInBucket ? "Added to BucketList" : children}
        </div>
      </div>
    </div>
  );
}

export default AddToBucketListButton;
