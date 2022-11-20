import Image from "next/image";
import StarIcon from "../../public/star_icon6.svg";
import styles from "./reviewCard.module.scss";

function ReviewCard() {
  return (
    <div className={styles.container}>
      <div className={styles.top_section}>
        <div className={styles.name}>
          <p>Mushfiq Mashuk</p>
        </div>
        <div className={styles.rating}>
          <Image src={StarIcon} width={18} height={18} />
          <div>
            <span className={styles.the_rating}>7.6</span>
            <span>/</span>
            <span>10</span>
          </div>
        </div>
      </div>
      <div className={styles.date}>12/08/2022</div>
    </div>
  );
}

export default ReviewCard;
