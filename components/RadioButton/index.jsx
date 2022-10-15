import styles from "./radioButton.module.scss";

function RadioButton() {
  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <input
          id="good"
          className={styles.radio_button}
          type="radio"
          name="radio"
        />
        <div className={styles.radio_tile}>
          <label for="good" className={styles.radio_tile_label}>
            Good
          </label>
        </div>
      </div>

      <div className={styles.input_container}>
        <input
          id="moderate"
          className={styles.radio_button}
          type="radio"
          name="radio"
        />
        <div className={styles.radio_tile}>
          <label for="moderate" className={styles.radio_tile_label}>
            Moderate
          </label>
        </div>
      </div>

      <div className={styles.input_container}>
        <input
          id="bad"
          className={styles.radio_button}
          type="radio"
          name="radio"
        />
        <div className={styles.radio_tile}>
          <label for="bad" className={styles.radio_tile_label}>
            Bad
          </label>
        </div>
      </div>
    </div>
  );
}

export default RadioButton;
