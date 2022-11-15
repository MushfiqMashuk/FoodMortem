import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import checkUserLogin from "../../helpers/checkUserLogin";
import userAvatar from "../../public/avatar.svg";
import styles from "./navbar.module.scss";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = checkUserLogin();
    const { userId, userName, email, bucketList } = loggedInUser;
    if (loggedInUser) {
      setUser({
        userId,
        userName,
        email,
        bucketList,
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div>Logo</div>
      {/* <div className="searchbar">
        <input type="text" placeholder="search here" />
        <button className={styles.search_button}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div> */}

      <div className={styles.midsection}>
        <p>Bucket List</p>
        <p>Suggest Something</p>
      </div>

      <div className={styles.profile}>
        {user && (
          <div className={styles.user_info}>
            <div className={styles.avatar}>
              <Image src={userAvatar} height={20} width={20} />
            </div>
            <div>{user && <p>{user.userName}</p>}</div>
          </div>
        )}
        {user ? (
          <Link href={"/signout"}>
            <a>
              <button>Signout</button>
            </a>
          </Link>
        ) : (
          <Link href={"/signin"}>
            <a>
              <button>Signin</button>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
