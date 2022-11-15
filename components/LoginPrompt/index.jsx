import { useRouter } from "next/router";
import React from "react";
import styles from "./loginPrompt.module.scss";

function LoginPrompt() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>
        <p>
          You are not signed in. Please sign in to rate your favourite food.
        </p>
      </div>
      <div className={styles.button_container}>
        <button
          className={styles.signin_button}
          onClick={() => router.push("/signin")}
        >
          Signin here
        </button>
        <button
          className={styles.signin_button}
          onClick={() => router.push("/signup")}
        >
          Signup here
        </button>
      </div>
    </div>
  );
}

export default LoginPrompt;
