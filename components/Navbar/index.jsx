import Link from "next/link";
import { useEffect, useState } from "react";
import checkUserLogin from "../../helpers/checkUserLogin";
import styles from "./navbar.module.scss";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = checkUserLogin();
    console.log(loggedInUser);

    if (loggedInUser) {
      console.log(loggedInUser.userName);
      setUser({
        userId: loggedInUser.userId,
        userName: loggedInUser.userName,
        email: loggedInUser.email,
        bucketList: loggedInUser.bucketList,
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
              <p>Avatar</p>
              {/* <Image src={userAvatar}/> */}
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
