import Link from "next/link";
import styles from "./navbar.module.scss";

function Navbar() {
  return (
    <div className={styles.container}>
      <div>Logo</div>
      <div className="searchbar">
        <input type="text" placeholder="search here" />
        <button className={styles.search_button}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <p>Bucket List</p>
      <p>Suggest Something</p>

      <div className={styles.profile}>
        <Link href={"/signin"}>
          <a>
            <button>Signin</button>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
