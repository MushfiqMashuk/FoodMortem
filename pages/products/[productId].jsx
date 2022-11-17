import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import AddToBucketListButton from "../../components/AddToBucketListButton";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import LoginPrompt from "../../components/LoginPrompt";
import Modal from "../../components/Modal";
import ProductImage from "../../components/ProductImage";
import ReviewAnalytics from "../../components/ReviewAnalytics";
import ReviewForm from "../../components/ReviewForm";
import SimilarProduct from "../../components/SimilarProduct";
import SubTitle from "../../components/SubTitle";
import Title from "../../components/Title";
import WriteAReview from "../../components/WriteAReview";
import checkUserLogin from "../../helpers/checkUserLogin";
import styles from "./singleProduct.module.scss";

function SingleProduct({ product }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const loggedInUser = checkUserLogin();

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
                <div>
                  <Link href={`/brands/${product?.brand?.id}`}>
                    <a>
                      <SubTitle className={styles.product_brand} title="Brand">
                        {product?.brand?.name
                          ? product?.brand?.name
                          : product?.brand}
                      </SubTitle>
                    </a>
                  </Link>
                </div>
                <div className={styles.straight_line}>
                  <p>┈┈</p>
                </div>
                <div className={styles.product_category}>
                  <Link href={`/categories/${product?.category?.id}`}>
                    <a>
                      <SubTitle
                        className={styles.product_category}
                        title="Category"
                      >
                        {product?.category?.name
                          ? product?.category?.name
                          : product?.category}
                      </SubTitle>
                    </a>
                  </Link>
                </div>
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
              {loggedInUser ? (
                <ReviewForm productName={product?.name} />
              ) : (
                <LoginPrompt
                  promptText="You are not signed in. Please sign in to review your favourite food."
                  firstButtonText="Sign In here"
                  secondButtonText="Sign Up here"
                />
              )}
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
  const fetchedData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
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
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
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
