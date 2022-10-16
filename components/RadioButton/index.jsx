import styles from "./radioButton.module.scss";

const RadioButton = ({ options = [] }) => {
  return (
    <div className={styles.button_container}>
      <p className={styles.review_type}>
        Select Review Type <span className="required">*</span>
      </p>
      <div className={styles.container}>
        {options &&
          options.length > 0 &&
          options.map((option) => (
            <div className={styles.input_container}>
              <input
                id={option}
                className={styles.radio_button}
                type="radio"
                name="radio"
                required
              />
              <div className={styles.radio_tile}>
                <label for={option} className={styles.radio_tile_label}>
                  {option &&
                    option.length > 0 &&
                    option.charAt(0).toUpperCase() + option.slice(1)}
                </label>
              </div>
            </div>
          ))}
      </div>
      <p className="error_message">Error Message</p>
    </div>
  );
};

export default RadioButton;
