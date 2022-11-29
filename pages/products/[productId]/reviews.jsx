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
  const [userReviews, setUserReviews] = useState(products);
  const rating = useRatingStore(state => state.rating);

  useEffect(() => {
    setUserReviews(products);
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
              src={userReviews?.img}
              alt={userReviews?.name}
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
              <Link href={`/products/${userReviews?._id}`}>
                <a>{userReviews?.name}</a>
              </Link>
            </div>
            <div className={styles.brand_name}>
              <Link href={`/brands/${userReviews?.brand?.id}`}>
                <a>{userReviews?.brand?.name}</a>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.filter}></div>
        <div className={styles.body}>
          {userReviews &&
            userReviews?.reviews?.map((review) => {
              const user = userReviews?.ratings?.find(rating => rating.userId == review.userId);
              return <ReviewCard page="reviews" userReview={review} rating={user ? user?.rating : null} currentUserRating={rating}/>;
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
