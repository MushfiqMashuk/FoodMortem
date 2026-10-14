import styles from "./writeAReview.module.scss";

const WriteAReview = ({ openModal }) => {
  return (
    <div className={styles.container} onClick={openModal}>
      <p className={styles.text}>Write a review...</p>
    </div>
  );
};

export default WriteAReview;
