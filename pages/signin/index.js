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
        <form className={`${styles.login} ${styles.form}`} action="#">
          <div className={styles.text_input}>
            <input type="text" placeholder="Enter email" />
            
          </div>

          <div className={styles.text_input}>
            <input type="password" placeholder="Enter password" />
            
          </div>

          <button className={styles.button}>
            <span>Submit now</span>
          </button>

          <div className="info">
            Don't have an account?{" "}
            <Link href="/signup">
              <a>Signup </a>
            </Link>
            instead.
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
