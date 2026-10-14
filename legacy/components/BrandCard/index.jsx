import Image from "next/image";
import Link from "next/link";
import { shimmer, toBase64 } from "../../helpers/shimmerEffect";
import Overlay from "../Overlay";
import SubTitle from "../SubTitle";
import styles from "./brandCard.module.scss";

const BrandCard = ({ product }) => {
  return (
    <div className={styles.brand_card}>
      <div className={styles.card_image_container}>
        <Image
          src={product?.brand?.img}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
          style={{ borderRadius: "0.3rem" }}
        />

        <Link href={`/brands/${product?.brand?.id}`}>
          <a>
            <Overlay />
          </a>
        </Link>
      </div>

      <div className={styles.description}>
        <div className={styles.brand_info}>
          <Link href={`/brands/${product?.brand?.id}`}>
            <a>
              <SubTitle className={styles.brand_name}>
                {product?.brand?.name}
              </SubTitle>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
