import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReviewAnalytics from "../../components/ReviewAnalytics";
import SimilarProduct from "../../components/SimilarProduct";
import { shimmer, toBase64 } from "../../helpers/shimmerEffect";
import No_Image from "../../public/no_image.png";
import styles from "./singleProduct.module.scss";

function SingleProduct({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {product && (
        <Layout>
          <div className={styles.header}>
            <div className={styles.top_section}>
              <div className={styles.product_name}>
                <h1>{product.name}</h1>
              </div>
              <div className={styles.bucket_list}>
                <div className={styles.bucket_list_button}>
                  <div className={styles.plus}>+</div>
                  <span className={styles.button_title}>Add to Bucketlist</span>
                </div>
              </div>
            </div>
            <div className={styles.product_info}>
              <div className={styles.product_description}>
                <h3
                  className={styles.product_brand}
                  onClick={() => router.push(`/brands/${product?.brand?.id}`)}
                >
                  {product.brand.name ? product.brand.name : product.brand}
                </h3>
                <h3
                  className={styles.product_category}
                  onClick={() =>
                    router.push(`/categories/${product?.category?.id}`)
                  }
                >
                  {product.category.name
                    ? product.category.name
                    : product.category}
                </h3>
              </div>
              <div className={styles.other_description}></div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.image_container}>
              <Image
                src={product.img ? product.img : No_Image}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </div>
            <ReviewAnalytics />
          </div>
          <SimilarProduct />
        </Layout>
      )}
    </>
  );
}

export default SingleProduct;

export async function getStaticPaths() {
  const fetchedData = await fetch(`http://localhost:4000/products`);
  const data = await fetchedData.json();

  const paths = data.map((product) => ({
    params: { productId: `${product.id}` },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { productId } = params;

  const fetchedData = await fetch(
    `http://localhost:4000/products/${productId}`
  );
  const data = await fetchedData.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: data,
    },
    revalidate: 60,
  };
}
