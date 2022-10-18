import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import AddToBucketListButton from "../../components/AddToBucketListButton";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import Modal from "../../components/Modal";
import ProductImage from "../../components/ProductImage";
import ReviewAnalytics from "../../components/ReviewAnalytics";
import ReviewForm from "../../components/ReviewForm";
import SimilarProduct from "../../components/SimilarProduct";
import SubTitle from "../../components/SubTitle";
import Title from "../../components/Title";
import WriteAReview from "../../components/WriteAReview";
import styles from "./singleProduct.module.scss";

function SingleProduct({ product }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

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
                <Title>{product.name}</Title>
              </div>
              <AddToBucketListButton>Add to BucketList</AddToBucketListButton>
            </div>
            <div className={styles.product_info}>
              <div className={styles.product_description}>
                <Link href={`/brands/${product?.brand?.id}`}>
                  <a>
                    <SubTitle className={styles.product_brand} title="Brand">
                      {product.brand.name ? product.brand.name : product.brand}
                    </SubTitle>
                  </a>
                </Link>
                <Link href={`/categories/${product?.category?.id}`}>
                  <a>
                    <SubTitle
                      className={styles.product_category}
                      title="Category"
                    >
                      {product.category.name
                        ? product.category.name
                        : product.category}
                    </SubTitle>
                  </a>
                </Link>
              </div>
              <div className={styles.other_description}></div>
            </div>
          </div>
          <div className={styles.content}>
            <ProductImage product={product} />
            <ReviewAnalytics product={product} />
          </div>
          {showModal && (
            <Modal
              title="Review this product"
              onClose={() => setShowModal(false)}
            >
              <ReviewForm productName={product?.name} />
            </Modal>
          )}
          <WriteAReview openModal={() => setShowModal(true)} />
          <SimilarProduct product={product} />
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
