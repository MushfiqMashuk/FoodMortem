import Layout from "../../../components/Layout";
import styles from "./bucketlist.module.scss";

function BucketList() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.info}>
            <div className={styles.name}>
              <Link href={"/"}>
                <a>Mutton Kacchi</a>
              </Link>
            </div>
            <div className={styles.brand_name}>
              <Link href={"/"}>
                <a>Sultan's Dine</a>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.filter}></div>
        <div className={styles.body}>
          <ReviewCard page="reviews" />
          <ReviewCard page="reviews" />
          <ReviewCard page="reviews" />
          <ReviewCard page="reviews" />
        </div>
      </div>
    </Layout>
  );
}

export default BucketList