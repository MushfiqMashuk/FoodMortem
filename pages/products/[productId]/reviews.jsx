import Layout from "../../../components/Layout";
import styles from "./reviews.module.scss";
import ReviewCard from "../../../components/ReviewCard";
import Image from "next/image";
import No_Image from "../../../public/no_image.png";
import { shimmer, toBase64 } from "../../../helpers/shimmerEffect";
import Link from "next/link";

function Reviews() {

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.image_container}>
            <Image
              className={styles.image_class}
              src={"https://i.ibb.co/T1VsWB9/kacchi-sultan-s-dine.jpg"}
              alt={"nicde"}
              width={150}
              height={150}
              objectFit="cover"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </div>
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

export default Reviews