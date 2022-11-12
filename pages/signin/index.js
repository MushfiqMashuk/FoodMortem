import Image from "next/image";
import Link from "next/link";
import loginImage from "../../public/login.svg";
import styles from "./signin.module.scss";

function Signin() {
  return (
    <div className={styles.container}>
      <h1>Login to your account</h1>
      <div className={styles.column}>
        <div className={styles.illustration}>
          <Image src={loginImage} width={500} height={500} />
        </div>
        <form className={`${styles.signin} ${styles.form}`}>
          <div className={styles.text_input}>
            <input type="email" placeholder="Enter email" required />
          </div>

          <div className={styles.text_input}>
            <input type="password" placeholder="Enter password" required />
          </div>

          <button className={styles.button}>
            <span>Submit now</span>
          </button>

          <div className={styles.info}>
            Don't have an account?{" "}
            <Link href="/signup">
              <a>
                <span className={styles.signup_instead}>Signup</span>{" "}
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
