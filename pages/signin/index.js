import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import checkUserLogin from "../../helpers/checkUserLogin";
import loginImage from "../../public/login.svg";
import styles from "./signin.module.scss";

function Signin() {
  const loggedInUser = checkUserLogin();
  const router = useRouter();

  console.log(router.query);
  console.log(decodeURIComponent(router.query.from));

  if (loggedInUser) {
    router.push("/");
  }

  const defaultFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [signinError, setSigninError] = useState(null);

  const { email, password } = formData;

  const handleSubmit = (e) => {
    // preventing the default behaviour (reloading) of the form
    e.preventDefault();

    // submit the form
    formSubmit();
  };

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
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        {
          method: "POST",
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // set the form data to it's default state
        //setFormData(defaultFormData);

        router.push(
          router.query.from ? decodeURIComponent(router.query.from) : "/"
        );

        // if (router.query && router.query.from) {
        //   router.push(router.query.from);
        // } else {
        //   router.push("/");
        // }
      } else {
        setSigninError(data.error?.message);
        //throw new Error("Signin failed! Incorrect email or password");
      }
    } catch (err) {
      setSigninError("Internal Server Error");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login to your account</h1>
      <div className={styles.column}>
        <div className={styles.illustration}>
          <Image src={loginImage} width={500} height={500} />
        </div>
        <form
          className={`${styles.signin} ${styles.form}`}
          onSubmit={handleSubmit}
        >
          <div className={styles.text_input}>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              required
              onChange={handleChange}
            />
          </div>

          <div className={styles.text_input}>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              required
              onChange={handleChange}
            />
          </div>

          <button className={styles.button}>
            <span>Submit now</span>
          </button>
          {signinError && signinError.length > 0 && (
            <p className={styles.signup_error}>{signinError}</p>
          )}
          <div className={styles.info}>
            Don't have an account?{" "}
            <Link href="/signup">
              <a>
                <span className={styles.signup_instead}>Sign Up</span>{" "}
              </a>
            </Link>
            here.
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
