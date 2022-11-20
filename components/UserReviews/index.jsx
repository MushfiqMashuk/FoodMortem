import Link from "next/link";
import ReviewCard from "../ReviewCard";
import styles from "./userReviews.module.scss";

function UserReviews() {
  return (
    <div className={styles.container}>
      <div className={styles.top_section}>
        <h2 className={styles.heading_title}>User Reviews</h2>
        <Link href={`/products`}>
          <a className="see_all">See all</a>
        </Link>
      </div>
      <div className={styles.body}>
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
}

export default UserReviews;
