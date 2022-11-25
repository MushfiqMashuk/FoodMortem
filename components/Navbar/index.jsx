import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import checkUserLogin from "../../helpers/checkUserLogin";
import userAvatar from "../../public/avatar.svg";
import useBucketListStore from "../../store/useBucketListStore";
import LoginPrompt from "../LoginPrompt";
import Modal from "../Modal";
import SuggestionForm from "../SuggestionForm";
import styles from "./navbar.module.scss";

function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const loggedInUser = checkUserLogin();

  let userBucketList;

  if (loggedInUser) {
    const [bucketList, setBucketList] = useBucketListStore((state) => [
      state.bucketList,
      state.setBucketList,
    ]);

    userBucketList = bucketList;

    useEffect(() => {
      const getBucketList = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/bucketList?userId=${loggedInUser.userId}`
          );

          const data = await response.json();

          if (response.ok) {
            setBucketList(data.bucketList);
          }
        } catch (err) {
          console.log(err);
        }
      };

      getBucketList();
    }, []);
  }

  useEffect(() => {
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

  const handleSuggestion = () => {
    setShowModal(true);
    setShowSuggestion(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowSuggestion(false);
  };

  return (
    <>
      {showModal && (
        <Modal
          title={showSuggestion ? "Suggest a product" : user && user.userName}
          onClose={handleClose}
        >
          {showSuggestion ? (
            <SuggestionForm onClose={handleClose} />
          ) : (
            <LoginPrompt
              promptText="Do you really want to sign out?"
              firstButtonText="Yes"
              secondButtonText="No"
              onClose={() => setShowModal(false)}
              signoutPrompt={true}
              handleSignout={handleSignout}
            />
          )}
        </Modal>
      )}
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.site_name}>
            <Link href="/">
              <a>{process.env.NEXT_PUBLIC_SITE_NAME}</a>
            </Link>
          </div>
        </div>
        {/* <div className="searchbar">
        <input type="text" placeholder="search here" />
        <button className={styles.search_button}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div> */}

        <div className={styles.midsection}>
          <div className={styles.bucket_list}>
            <p>Bucket List</p>
            {userBucketList && userBucketList.length > 0 && (
              <span className={styles.bucket_list_number}>
                {userBucketList.length}
              </span>
            )}
          </div>
          <div className={styles.suggest_product}>
            <p onClick={handleSuggestion}>Suggest a product</p>
          </div>
          <div className={styles.product_list}>
            <Link href="/products">
              <a>Product List</a>
            </Link>
          </div>
          <div className={styles.all_brands}>
            <p>All Brands</p>
          </div>
        </div>

        <div className={styles.profile}>
          {user && (
            <div className={styles.user_info}>
              <div className={styles.avatar}>
                <Image src={userAvatar} height={15} width={15} />
              </div>
              <div>{user && <p>{user.userName}</p>}</div>
            </div>
          )}
          {user ? (
            <div className={styles.button_container}>
              <button
                className={styles.signin_button}
                onClick={() => setShowModal(true)}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className={styles.button_container}>
              <button
                className={styles.signin_button}
                onClick={() =>
                  router.push(
                    `/signin?from=${encodeURIComponent(router.asPath)}`
                  )
                }
              >
                Sign In
              </button>
              <button
                className={styles.signin_button}
                onClick={() =>
                  router.push(
                    `/signup?from=${encodeURIComponent(router.asPath)}`
                  )
                }
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
