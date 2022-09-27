import Image from "next/image";
import { useState } from "react";
import addToBucketAfter from "../../public/add_to_bucket_after.svg";
import addToBucketBefore from "../../public/add_to_bucket_before.svg";
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
          <Image
            src={isInBucket ? addToBucketAfter : addToBucketBefore}
            width={25}
            height={25}
          />
        </div>
        <div className={styles.button_title}>
          {isInBucket ? "In BucketList" : children}
        </div>
      </div>
    </div>
  );
}

export default AddToBucketListButton;
