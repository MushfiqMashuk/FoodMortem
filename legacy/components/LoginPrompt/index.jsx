import { useRouter } from "next/router";
import React from "react";
import styles from "./loginPrompt.module.scss";

function LoginPrompt({
  promptText,
  firstButtonText,
  secondButtonText,
  onClose,
  signoutPrompt = false,
  handleSignout,
}) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>
        <p>{promptText}</p>
      </div>
      <div className={styles.button_container}>
        <div>
          {signoutPrompt ? (
            <button className={styles.signin_button} onClick={handleSignout}>
              {firstButtonText}
            </button>
          ) : (
            <button
              className={styles.signin_button}
              onClick={() =>
                router.push(`/signin?from=${encodeURIComponent(router.asPath)}`)
              }
            >
              {firstButtonText}
            </button>
          )}
        </div>
        <div>
          {signoutPrompt ? (
            <button className={styles.signin_button} onClick={() => onClose()}>
              {secondButtonText}
            </button>
          ) : (
            <button
              className={styles.signin_button}
              onClick={() =>
                router.push(`/signup?from=${encodeURIComponent(router.asPath)}`)
              }
            >
              {secondButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPrompt;
