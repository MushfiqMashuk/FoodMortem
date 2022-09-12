import { useEffect } from "react";
import styles from "./modal.module.scss";

const Modal = ({ onClose }) => {
  useEffect(() => {
    document.body.classList.add(styles.overflow_hidden);

    return () => document.body.classList.remove(styles.overflow_hidden);
  });

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.close_button_container} onClick={onClose}>
          {/* <button className={styles.close_button}>&times;</button> */}
          <span className={styles.close_button}>&times;</span>
          {/* <Image src={CrossIcon}/> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
