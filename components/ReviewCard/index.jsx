import Image from "next/image";
import StarIcon from "../../public/star_icon6.svg";
import styles from "./reviewCard.module.scss";

function ReviewCard({ page }) {
  return (
    <div
      className={
        page === "reviews"
          ? styles.container_for_reviews_page
          : styles.container
      }
    >
      <div className={styles.top_section}>
        <div className={styles.name}>
          <p>Mushfiq Mashuk</p>
        </div>
        <div className={styles.rating}>
          <Image src={StarIcon} width={16} height={16} />
          <div className={styles.rating_value}>
            <span className={styles.the_rating}>7.6</span>
            <span>/</span>
            <span>10</span>
          </div>
        </div>
      </div>
      <div className={styles.date}>12 September 2022</div>
      <div className={styles.body}>
        <div className={styles.type}>
          <div><p>Moderate</p></div>
        </div>
        <div className={styles.main_content}>
          <p>
            Trust me, it is the best Kacchi in town We visited there today
            (Sunday); found the place was crowded. Fortunately, we were in odd
            number; if we went two then authority compelled us to allow unknown
            persons to sit in front of us. I think this is the only demerit of
            this restaurant. Apart from this, food, environment and sitting was
            quite good. Because of crowded place, you might feel quite warm and
            when you start to consume more spicy Kacchi then it feels more
            warmer 😅 Long story short, we ordered Kacchi, Borhani and Firni.
            Firni was good but you may order Jorda instead of it. The delivery
            was a bit slow because of crowd. But overall their service was
            excellent, I must say. So, I would like to rate Sultan's Dine as 9
            out of 10. Food Rating: 10/10 Service Rating: 9/10 Place Rating:
            9/10
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
