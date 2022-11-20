import styles from "./suggestionForm.module.scss";

function SuggestionForm() {
  return (
    <div className={styles.container}>
      <form>
        <div>
          <input type="text" name="productName" placeholder="Product Name" />
        </div>
        <div>
          <input type="text" name="brandName" placeholder="Brand Name" />
        </div>
        <div>
          <input type="text" name="location" placeholder="Location" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default SuggestionForm;
