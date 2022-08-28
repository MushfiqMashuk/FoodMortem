import styles from "./loadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner}></div>
    // <div className={styles.lds_spinner}>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    // </div>
  );
};

export default LoadingSpinner;
