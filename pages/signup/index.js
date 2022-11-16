import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import validateName from "../../helpers/validateName";
import signupImage from "../../public/signup.svg";
import styles from "../signin/signin.module.scss";

function Signup() {
  const router = useRouter();
  const defaultFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nameError: null,
    passwordError: null,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [signupError, setSignupError] = useState(null);

  const { name, email, password, confirmPassword, nameError, passwordError } =
    formData;

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmit = async () => {
    const userObject = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      bucketList: [],
    };

    console.log(userObject);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
        }
      );

      if (response.ok) {
        const data = await response.json();
    
        router.push("/signin");
      } else {
        throw new Error(
          "Something went wrong! Try a different email account or a valid password"
        );
      }
    } catch (err) {
      setSignupError(err.message);
    }
  };

  const handleSubmit = (e) => {
    // preventing the default behaviour (reloading) of the form
    e.preventDefault();

    if (validate()) {
      // submit the form

      formSubmit();

      // set the form data to it's default state
     //setFormData(defaultFormData);
    }
  };

  const validate = () => {
    let nameError = null;
    let passwordError = null;

    if (!validateName(name)) {
      nameError = "Please enter a valid name";
    }
    if (password !== confirmPassword) {
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
              name="name"
              value={name}
              onChange={handleChange}
            />
            {nameError && nameError.length > 0 && (
              <p className={styles.error}>{nameError}</p>
            )}
          </div>

          <div className={styles.text_input}>
            <input
              type="email"
              placeholder="Enter email"
              required
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.text_input}>
            <input
              type="password"
              placeholder="Enter password"
              required
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.text_input}>
            <input
              type="password"
              placeholder="Confirm password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
            {passwordError && passwordError.length > 0 && (
              <p className={styles.error}>{passwordError}</p>
            )}
          </div>

          <label className={styles.terms}>
            <input type="checkbox" className={styles.checkbox} required />
            <span>I agree to the Terms & Conditions</span>
          </label>

          <button className={styles.button}>
            <span>Submit now</span>
          </button>
          {signupError && signupError.length > 0 && (
            <p className={styles.signup_error}>{signupError}</p>
          )}
          <div className={styles.info}>
            Already have an account?{" "}
            <Link href="/signin">
              <a>
                <span className={styles.signup_instead}>Sign In</span>{" "}
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
