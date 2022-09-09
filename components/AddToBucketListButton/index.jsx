import styles from "./addToBucketListButton.module.scss";

function AddToBucketListButton() {
  return (
    <div className={styles.bucket_list}>
      <div className={styles.bucket_list_button}>
        <div className={styles.plus}>+</div>
        <span className={styles.button_title}>Add to Bucketlist</span>
      </div>
    </div>
  );
}

export default AddToBucketListButton;
