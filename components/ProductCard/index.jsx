import Image from "next/image";
import Link from "next/link";
import calculateAverageRating from "../../helpers/calculateRating";
import { shimmer, toBase64 } from "../../helpers/shimmerEffect";
import StarIcon from "../../public/star_icon6.svg";
import AddToBucketListButton from "../AddToBucketListButton";
import Overlay from "../Overlay";
import SubTitle from "../SubTitle";
import styles from "./productCard.module.scss";

const ProductCard = ({ product, singleProduct = false }) => {
  const { ratings } = product;

  const productRating = calculateAverageRating(ratings);

  return (
    <div className={styles.product_card}>
      <div className={styles.card_image_container}>
        <Image
          src={product.img}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
          style={{ borderRadius: "0.3rem" }}
        />

        <Link href={`/products/${product._id}`}>
          <a>
            <Overlay />
          </a>
        </Link>
      </div>

      <div className={styles.product_description}>
        <div className={styles.product_rating}>
          <Image src={StarIcon} height={20} width={20} color="red" />
          <SubTitle className={styles.rating}>{productRating}</SubTitle>
        </div>
        <div className={styles.product_info}>
          <Link href={`/products/${product._id}`}>
            <a>
              <SubTitle className={styles.product_name}>
                {product.name}
              </SubTitle>
            </a>
          </Link>

          {!singleProduct && (
            <Link href={`/brands/${product.brand?.id}`}>
              <a>
                <SubTitle className={styles.product_name}>
                  {product.brand.name}
                </SubTitle>
              </a>
            </Link>
          )}

          <Link href={`/categories/${product.category?.id}`}>
            <a>
              <SubTitle className={styles.product_category}>
                {product.category.name
                  ? product.category.name
                  : product.category}
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

export default ProductCard;
