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
        <div className={styles.title}>
          <p>This is a title</p>
        </div>
        <div className={styles.main_content}>
          <p>
            While "Nope" is a visual spectacle I found that it didn't sit as
            well as I would've hoped when it came to the story. However, it
            still manages to reach its goal of entertaining on some level. The
            film felt slightly long due to the first and third acts feeling fast
            and somewhat stuffed with a lot of goings ons while the second act
            felt very slow and drawn out. The long parts put me into a state of
            boredom, and even further than that, once the reveal of the
            antagonist happened, the magic and tension disappeared. Before that
            tension disappeared I found there was some good tension built up due
            to the soundtrack, but again, things fell short.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
