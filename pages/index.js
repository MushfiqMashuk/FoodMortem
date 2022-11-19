import CarouselComponent from "../components/CarouselComponent";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import styles from "./homePage.module.scss";

export default function Home({ topRatedProducts }) {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top_rated_product}>
          <h2 className={styles.heading_title}>Top rated products</h2>
          <div className={styles.carousel}>
            <CarouselComponent
              products={topRatedProducts}
              noProductText="Sorry! No top rated products to show right now."
              rating={true}
              CardComponent={ProductCard}
              topRated={true}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let data;
  try {
    const fetchedData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/topRated`
    );

    data = await fetchedData.json();
  } catch (err) {
    console.log(err);
  }

  // if (!data) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      topRatedProducts: data,
    },
    revalidate: 60,
  };
}
