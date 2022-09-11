import { useEffect } from "react";
import styles from "./modal.module.scss";

const Modal = () => {
  useEffect(() => {
    document.body.classList.add(styles.overflow_hidden);

    return () => document.body.classList.remove(styles.overflow_hidden);
  });

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.close_button_container}>
          <button className={styles.close_button}>
            <span>&times;</span>
          </button>
        </div>
        <p>Simple Modal</p>
      </div>
    </div>
  );
};

export default Modal;
