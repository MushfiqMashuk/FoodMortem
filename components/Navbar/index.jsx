import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import checkUserLogin from "../../helpers/checkUserLogin";
import userAvatar from "../../public/avatar.svg";
import LoginPrompt from "../LoginPrompt";
import Modal from "../Modal";
import styles from "./navbar.module.scss";

function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

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

  const handleSignout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signout`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        router.reload();
      } else {
        throw new Error("Signout failed!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {showModal && (
        <Modal
          title={user && user.userName}
          onClose={() => setShowModal(false)}
        >
          <LoginPrompt
            promptText="Do you really want to sign out?"
            firstButtonText="Yes"
            secondButtonText="No"
            onClose={() => setShowModal(false)}
            signoutPrompt={true}
            handleSignout={handleSignout}
          />
        </Modal>
      )}
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
            <button
              className={styles.signin_button}
              onClick={() => setShowModal(true)}
            >
              Sign Out
            </button>
          ) : (
            <div>
              <Link href={"/signin"}>
                <a>
                  <button className={styles.signin_button}>Sign In</button>
                </a>
              </Link>
              <Link href={"/signup"}>
                <a>
                  <button className={styles.signin_button}>Sign Up</button>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
