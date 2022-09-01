import Image from "next/image";
import { useRouter } from "next/router";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./singleProduct.module.scss";
import No_Image from "../../public/no_image.png";

function SingleProduct({ product }) {
  const router = useRouter();

  const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#dddddd" offset="20%" />
      <stop stop-color="#f4f4f4" offset="50%" />
      <stop stop-color="#dddddd" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#dddddd" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  if (router.isFallback) {
    return <LoadingSpinner />;
  }

  return (
    <>
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
            <h3 className={styles.product_brand}>{product.brand}</h3>
            <h3 className={styles.product_category}>{product.category}</h3>
          </div>
          <div className={styles.other_description}></div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.image_container}>
          <Image
            src={product.img ? product.img : No_Image}
            layout="fill"
            objectFit="contain"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
          />
        </div>
        <div className={styles.review_analytics}></div>
      </div>
      <div>
        nice layout
      </div>
      <div>
        nice layout
      </div>
      <div>
        nice layout
      </div>
      <div>
        nice layout
      </div>
      <div>
        nice layout
      </div>
      <div>
        nice layout
      </div>
      <div>
        nice layout
      </div>
      <div>
        nice layout
      </div>
      <div>
        nice layout
      </div>
      <div>
        nice layout
      </div>
      <div>
        nice layout
      </div>
      <div>
        nice layout
      </div>
    </>
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
