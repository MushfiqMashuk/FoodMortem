import { useEffect } from "react";
import styles from "./modal.module.scss";

const Modal = () => {
  useEffect(() => {
    document.body.classList.add(styles.overflow_hidden);

    return () => document.body.classList.remove(styles.overflow_hidden);
  });

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <div className={styles.modal_content}>
          <span id="closeModal" className="close">
            &times;
          </span>
          <p>Simple Modal</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
