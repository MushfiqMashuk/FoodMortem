import Image from "next/image";
import Link from "next/link";
import signupImage from "../../public/signup.svg";
import styles from "../signin/signin.module.scss";

function Signup() {
  return (
    <div className={styles.container}>
      <h1>Create an account</h1>
      <div className={styles.column}>
        <div className={styles.illustration}>
          <Image src={signupImage} width={500} height={500} />
        </div>
        <form className={`${styles.signup} ${styles.form}`}>
          <div className={styles.text_input}>
            <input type="text" placeholder="Enter name" required />
          </div>

          <div className={styles.text_input}>
            <input type="email" placeholder="Enter email" required />
          </div>

          <div className={styles.text_input}>
            <input type="password" placeholder="Enter password" required />
          </div>

          <div className={styles.text_input}>
            <input type="password" placeholder="Confirm password" required />
          </div>

          <label className={styles.terms}>
            <input type="checkbox" className={styles.checkbox} />
            <span>I agree to the Terms & Conditions</span>
          </label>

          <div className={styles.button}>
            <span>Submit now</span>
          </div>

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
