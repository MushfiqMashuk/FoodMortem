import styles from "./addToBucketListButton.module.scss";

function AddToBucketListButton({children}) {
  return (
    <div className={styles.bucket_list}>
      <div className={styles.bucket_list_button}>
        <div className={styles.plus}>&#43;</div>
        <div className={styles.button_title}>{children}</div>
      </div>
    </div>
  );
}

export default AddToBucketListButton;
