import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import validateName from "../../helpers/validateName";
import signupImage from "../../public/signup.svg";
import styles from "../signin/signin.module.scss";

function Signup() {
  const defaultFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameError: null,
    passwordError: null,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  //   const handleChange = (e) => {
  //     const value = e.target.value;
  //     const name = e.target.name;

  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   };

  const setFormValues = () => {
    setFormData((prev) => ({
      ...prev,
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    }));
  };

  const handleSubmit = (e) => {
    // preventing the default behaviour (reloading) of the form
    e.preventDefault();

    setFormValues();

    if (validate()) {
      // submit the form

      formSubmit();

      // set the form data to it's default state
      setFormData(defaultFormData);
    }
  };

  const validate = () => {
    let nameError = null;
    let passwordError = null;

    if (!validateName(formData.name)) {
      nameError = "Please enter a valid name";
    }
    if (formData.password !== formData.confirmPassword) {
      passwordError = "Password didn't match";
    }

    if (nameError || passwordError) {
      setFormData((prev) => ({ ...prev, nameError, passwordError }));
      return false;
    }
    return true;
  };

  return (
    <div className={styles.container}>
      <h1>Create an account</h1>
      <div className={styles.column}>
        <div className={styles.illustration}>
          <Image src={signupImage} width={500} height={500} />
        </div>
        <form
          className={`${styles.signup} ${styles.form}`}
          onSubmit={handleSubmit}
        >
          <div className={styles.text_input}>
            <input
              type="text"
              placeholder="Enter name"
              required
              ref={nameRef}
            />
            {nameError && ratingError.length > 0 && (
              <p className="error_message">{ratingError}</p>
            )}
          </div>

          <div className={styles.text_input}>
            <input
              type="email"
              placeholder="Enter email"
              required
              ref={emailRef}
            />
          </div>

          <div className={styles.text_input}>
            <input
              type="password"
              placeholder="Enter password"
              required
              ref={passwordRef}
            />
          </div>

          <div className={styles.text_input}>
            <input
              type="password"
              placeholder="Confirm password"
              required
              ref={confirmPasswordRef}
            />
          </div>

          <label className={styles.terms}>
            <input type="checkbox" className={styles.checkbox} />
            <span>I agree to the Terms & Conditions</span>
          </label>

          <button className={styles.button}>
            <span>Submit now</span>
          </button>

          <div className={styles.info}>
            Already have an account?{" "}
            <Link href="/signin">
              <a>
                <span className={styles.signup_instead}>Signin</span>{" "}
              </a>
            </Link>{" "}
            here.
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
