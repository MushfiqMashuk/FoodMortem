import React from "react";
import SearchIcon from "../../public/search_icon.svg";
import styles from "./navbar.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <div className={styles.container}>
      <div>Logo</div>
      <div className="searchbar">
        <input type="text" placeholder="search here" />
        <button>Search</button>
      </div>

      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="What are you looking for?"
        />
        <button type="submit" className="searchButton">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <p>Bucket List</p>
      <p>Suggest Something</p>

      <div className={styles.profile}>
        <button>Signup</button>
      </div>
    </div>
  );
}

export default Navbar;
