import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import ReviewCard from "../../../components/ReviewCard";
import { shimmer, toBase64 } from "../../../helpers/shimmerEffect";
import NoImage from "../../../public/no_image.png";
import useRatingStore from "../../../store/useRatingStore";
import styles from "./reviews.module.scss";

function Reviews({ products }) {
  let userReviews;

  const [product, setProduct] = useState(products);
  
  const [reviews, setReviews, rating] = useRatingStore((state) => [
    state.reviews,
    state.setReviews,
    state.rating,
  ]);


  useEffect(() => {
    userReviews = products?.reviews;
    setReviews(userReviews && userReviews.length > 0 && userReviews);
    setProduct(products);
  }, [products]);

  // useEffect(() => {
  //   const getReviews = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/review?productId=${router?.query?.productId}`
  //       );

  //       if (response.ok) {
  //         const data = await response.json();
  //         //console.log(data);
  //         setUserReviews(data.reviews);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   getReviews();
  // }, [router.query]);

  // const userReviewObject = {
  //   name: singleReview.name,
  //   type: singleReview.type,
  //   date: singleReview.date,
  //   review: singleReview.review,
  //   userId: singleReview.userId,
  // };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.image_container}>
            <Image
              className={styles.image_class}
              src={product?.img}
              alt={product?.name}
              width={150}
              height={150}
              objectFit="cover"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>
              <Link href={`/products/${product?._id}`}>
                <a>{product?.name}</a>
              </Link>
            </div>
            <div className={styles.brand_name}>
              <Link href={`/brands/${product?.brand?.id}`}>
                <a>{product?.brand?.name}</a>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.filter}></div>
        <div className={styles.body}>
          {reviews &&
            reviews?.map((review) => {
              const user = product?.ratings?.find(
                (rating) => rating.userId == review.userId
              );
              return (
                <ReviewCard
                  page="reviews"
                  userReview={review}
                  rating={user ? user?.rating : null}
                  currentUserRating={rating}
                  productId={product?._id}
                />
              );
            })}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { productId } = params;
  let data;
  try {
    const fetchedData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/review?productId=${productId}`
    );

    if (fetchedData.ok) {
      data = await fetchedData.json();
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
      products: data,
    },
    revalidate: 60,
  };
}

export default Reviews;
