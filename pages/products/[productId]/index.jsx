import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import connectDB from "../../../backend/config/db";
import AddToBucketListButton from "../../../components/AddToBucketListButton";
import Layout from "../../../components/Layout";
import LoadingSpinner from "../../../components/LoadingSpinner";
import LoginPrompt from "../../../components/LoginPrompt";
import Modal from "../../../components/Modal";
import ProductImage from "../../../components/ProductImage";
import ReviewAnalytics from "../../../components/ReviewAnalytics";
import ReviewForm from "../../../components/ReviewForm";
import SimilarProduct from "../../../components/SimilarProduct";
import SubTitle from "../../../components/SubTitle";
import Title from "../../../components/Title";
import UserReviews from "../../../components/UserReviews";
import WriteAReview from "../../../components/WriteAReview";
import checkUserLogin from "../../../helpers/checkUserLogin";
import useRatingStore from "../../../store/useRatingStore";
import styles from "./singleProduct.module.scss";

function SingleProduct({ product, similarProducts }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const loggedInUser = checkUserLogin();
  let ratings;
  let userReviews;

  const [setRating, reviews, setReviews, rating] = useRatingStore((state) => [
    state.setRating,
    state.reviews,
    state.setReviews,
    state.rating
  ]);

  useEffect(() => {
    ratings = product?.ratings;

    if (loggedInUser) {
      const myRating = ratings?.filter(
        (rating) => rating.userId == loggedInUser.userId
      );

      setRating(myRating && myRating.length > 0 && myRating[0]?.rating);
    }
  }, [product]);

  useEffect(() => {
    userReviews = product?.reviews;
    setReviews(userReviews && userReviews.length > 0 && userReviews);
  }, [product]);

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
                <ReviewForm
                  productName={product?.name}
                  productId={product?._id}
                  onClose={() => setShowModal(false)}
                />
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
          <UserReviews
            reviews={reviews?.slice(-3)}
            productId={product?._id}
            ratings={product?.ratings}
            currentUserRating={rating}
          />
          <SimilarProduct products={similarProducts} />
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
  let data;
  let similarProducts;
  connectDB();

  try {
    const fetchedData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
    );
    data = await fetchedData.json();
  } catch (err) {
    console.log(err);
  }
  const { tags } = data;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/similarProduct`,
      {
        method: "POST",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags, productId }),
      }
    );

    if (response.ok) {
      similarProducts = await response.json();
    } else {
      throw new Error("No similar products to show!");
    }
  } catch (err) {
    console.log(err);
  }

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: data,
      similarProducts,
    },
    revalidate: 60,
  };
}
