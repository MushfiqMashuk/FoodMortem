import styles from "./suggestionForm.module.scss";

function SuggestionForm() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={`${styles.form_element}`}>
          <input type="text" name="productName" placeholder="Product Name" required/>
        </div>
        <div className={`${styles.form_element}`}>
          <input type="text" name="brandName" placeholder="Brand Name" required/>
        </div>
        <div className={`${styles.form_element}`}>
          <input type="text" name="location" placeholder="Location" />
        </div>
        <div className={`${styles.form_element}`}>
          <button type="submit" className={`${styles.submit_button}`}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SuggestionForm;
