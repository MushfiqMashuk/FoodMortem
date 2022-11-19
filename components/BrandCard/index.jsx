import Image from "next/image";
import Link from "next/link";
import { shimmer, toBase64 } from "../../helpers/shimmerEffect";
import AddToBucketListButton from "../AddToBucketListButton";
import Overlay from "../Overlay";
import SubTitle from "../SubTitle";
import styles from "./productCard.module.scss";

const BrandCard = ({ brand }) => {
  return (
    <div className={styles.product_card}>
      <div className={styles.card_image_container}>
        <Image
          src={brand.img}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
          style={{ borderRadius: "0.3rem" }}
        />

        <Link href={`/brands/${brand?._id}`}>
          <a>
            <Overlay />
          </a>
        </Link>
      </div>

      <div className={styles.product_description}>
        <div className={styles.product_info}>
          <Link href={`/brands/${brand?._id}`}>
            <a>
              <SubTitle className={styles.product_name}>
                {brand.name}
              </SubTitle>
            </a>
          </Link>
        </div>
        <div>
          <AddToBucketListButton>BucketList</AddToBucketListButton>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
