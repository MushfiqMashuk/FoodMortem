import "react-multi-carousel/lib/styles.css";
import CarouselComponent from "../CarouselComponent";
import styles from "./similarProduct.module.scss";
import ProductCard from "../ProductCard";

function SimilarProduct({ products = [] }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading_title}>
        Similar product from other brands
      </h2>
      <CarouselComponent
        products={products}
        noProductText="Sorry! No similar products to show right now. Would you like to suggest anything?"
        CardComponent={ProductCard}
      />
    </div>
  );
}

export default SimilarProduct;
