import styles from "./goToPage.module.scss";

import Link from "next/link";
import React from "react";

function GoToPage({ text, href = "" }) {
  return (
    <div className={styles.container}>
      <Link href={href}>
        <a>
          <p>{text}</p>
        </a>
      </Link>
    </div>
  );
}

export default GoToPage;
