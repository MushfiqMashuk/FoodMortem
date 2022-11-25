import { useState } from "react";
import styles from "./suggestionForm.module.scss";

function SuggestionForm({onClose}) {
  const [formData, setFormData] = useState({
    productName: "",
    brandName: "",
    location: "",
    suggestionError: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // preventing the default behaviour (reloading) of the form
    e.preventDefault();

    // submit the form
    formSubmit();
  };

  const formSubmit = async () => {
    const { productName, brandName, location } = formData;

    const suggestionObject = {
      productName: productName.trim().toLowerCase(),
      brandName: brandName.trim().toLowerCase(),
      location: location.trim().toLowerCase(),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/suggestions`,
        {
          method: "POST",
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "Content-Type": "application/json",
          },
          body: JSON.stringify(suggestionObject),
        }
      );

      const data = await response.json();

      if (response.ok) {
        //setReviews(data.reviews);

        console.log(formData);

        onClose();
      } else {
        setFormData((prev) => ({
          ...prev,
          reviewError: "Can not provide a suggestion write now",
        }));
      }
    } catch (err) {
      setError((prev) => ({
        ...prev,
        reviewError: "Internal server error!",
      }));
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={`${styles.form_element}`}>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            placeholder="Product Name"
            required
            onChange={handleChange}
          />
        </div>
        <div className={`${styles.form_element}`}>
          <input
            type="text"
            name="brandName"
            value={formData.brandName}
            placeholder="Brand Name"
            required
            onChange={handleChange}
          />
        </div>
        <div className={`${styles.form_element}`}>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className={`${styles.form_element}`}>
          <button
            type="submit"
            className={`${styles.submit_button}`}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SuggestionForm;
