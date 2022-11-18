import Image from "next/image";
import NoProductImage from "../../public/no_product.svg";
import styles from "./noProduct.module.scss";

function NoProduct({ text = "Sorry! No products to show right now.", children }) {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <Image src={NoProductImage} height={150} width={150} />
      </div>
      <div className={styles.text_container}>
        <p>{text}</p>
      </div>
      {children ? children : null}
    </div>
  );
}

export default NoProduct;
