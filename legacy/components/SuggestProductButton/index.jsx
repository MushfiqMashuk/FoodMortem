import { useState } from "react";
import Modal from "../Modal";
import SuggestionForm from "../SuggestionForm";
import styles from "./suggestProductButton.module.scss";

function SuggestProductButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal title="Suggest a product" onClose={() => setShowModal(false)}>
          <SuggestionForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
      <button className={styles.button} onClick={() => setShowModal(true)}>
        Suggest a product
      </button>
    </>
  );
}

export default SuggestProductButton;
