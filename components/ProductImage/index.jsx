import Image from "next/image";
import { shimmer, toBase64 } from "../../helpers/shimmerEffect";
import No_Image from "../../public/no_image.png";
import styles from "./productImage.module.scss";

function ProductImage({ product }) {
  return (
    <div className={styles.image_container}>
      <Image
        src={product.img ? product.img : No_Image}
        alt={product.name}
        layout="fill"
        objectFit="contain"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      />
    </div>
  );
}

export default ProductImage;
