import React from "react";
import SubTitle from "../SubTitle";
import styles from "./loginPrompt.module.scss";

function LoginPrompt() {
  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>
        <SubTitle>
          You are not signed in. Please sign in to rate your favourite food.
        </SubTitle>
      </div>
      <div className={styles.button_container}>
        <button>Signin here</button>
        <button>Signup here</button>
      </div>
    </div>
  );
}

export default LoginPrompt;
