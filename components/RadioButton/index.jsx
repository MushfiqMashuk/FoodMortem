import { useState } from "react";
import randomNumber from "../../helpers/randomNumber";
import styles from "./radioButton.module.scss";

const RadioButton = ({ options = [] }) => {
  const [value, setValue] = useState("");

  const isSelected = (selectedValue) => selectedValue === value;

  const handleChange = (e) => {
    const target = e.target;
    setValue(target.value);
  };

  return (
    <div className={styles.container}>
      {options &&
        options.length > 0 &&
        options.map((option) => (
          <div
            className={styles.input_container}
            key={randomNumber(Date.now())}
          >
            <input
              id={option}
              className={styles.radio_button}
              type="radio"
              name="radio"
              value={option.toLowerCase()}
              checked={isSelected(option.toLowerCase())}
              onChange={handleChange}
              required
            />
            <div className={styles.radio_tile}>
              <label htmlFor={option} className={styles.radio_tile_label}>
                {option &&
                  option.length > 0 &&
                  option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RadioButton;
