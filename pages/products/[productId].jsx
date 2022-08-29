import { useRouter } from "next/router";
import React, { useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./singleProduct.module.scss";

function SingleProduct({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.top_section}>
      <div className={styles.product_description}>
        <div className={styles.product_name}>{product.name}</div>
        <div className={styles.product_brand}>{product.brand}</div>
        <div className={styles.product_category}>{product.category}</div>
      </div>
      <div className={styles.bucket_list}>
        <button className={styles.bucket_list_button}>
          <span>Add to bucket list</span>
        </button>
      </div>
    </div>
  );
}

export default SingleProduct;

export async function getStaticPaths() {
  // const fetchedData = await fetch(
  //   `http://localhost:4000/products`
  // );
  // const data = await fetchedData.json();

  // const paths = data.map((product) => ({
  //   params: { productId: `${product.id}` },
  // }));

  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { productId } = params;

  const fetchedData = await fetch(
    `http://localhost:4000/products/${productId}`
  );
  const data = await fetchedData.json();

  // if (!data.id) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      product: data,
    },
    revalidate: 60,
  };
}
