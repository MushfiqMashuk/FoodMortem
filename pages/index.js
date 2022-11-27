import Link from "next/link";
import BrandCard from "../components/BrandCard";
import CarouselComponent from "../components/CarouselComponent";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import styles from "./homePage.module.scss";

export default function Home({ topRatedProducts, kacchi, burger, pizza }) {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top_rated_product}>
          <div className={styles.top}>
            <h2 className={styles.heading_title}>Top rated products</h2>
            <Link href={`/products`}>
              <a className="see_all">See all products</a>
            </Link>
          </div>
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
        <div className={styles.top_rated_brands}>
          <div className={styles.heading}>
            <h2 className={styles.heading_title}>Top rated brands</h2>
          </div>
          <div className={styles.carousel}>
            <CarouselComponent
              products={topRatedProducts}
              noProductText="Sorry! No top rated brands to show right now."
              CardComponent={BrandCard}
              brandCard
            />
          </div>
        </div>

        <div className={styles.kacchi}>
          <div className={styles.top}>
            <h2 className={styles.heading_title}>Kacchi</h2>
            <Link href={`/categories/${kacchi[0]?.category?.id}`}>
              <a className="see_all">See all</a>
            </Link>
          </div>
          <div className={styles.carousel}>
            <CarouselComponent
              products={kacchi}
              noProductText="Sorry! No related products to show right now."
              rating={true}
              CardComponent={ProductCard}
            />
          </div>
        </div>

        <div className={styles.burger}>
          <div className={styles.top}>
            <h2 className={styles.heading_title}>Burger</h2>
            <Link href={`/categories/${burger[0]?.category?.id}`}>
              <a className="see_all">See all</a>
            </Link>
          </div>
          <div className={styles.carousel}>
            <CarouselComponent
              products={burger}
              noProductText="Sorry! No related products to show right now."
              rating={true}
              CardComponent={ProductCard}
            />
          </div>
        </div>

        <div className={styles.pizza}>
          <div className={styles.top}>
            <h2 className={styles.heading_title}>Pizza</h2>
            <Link href={`/categories/${pizza[0]?.category?.id}`}>
              <a className="see_all">See all</a>
            </Link>
          </div>
          <div className={styles.carousel}>
            <CarouselComponent
              products={pizza}
              noProductText="Sorry! No related products to show right now."
              rating={true}
              CardComponent={ProductCard}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let data;
  let kacchi;
  let burger;
  let pizza;
  try {
    const fetchedData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/topRated`
    );

    const fetchedKacchi = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?categoryName=${process.env.NEXT_PUBLIC_KACCHI}`
    );

    const fetchedBurger = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?categoryName=${process.env.NEXT_PUBLIC_BURGER}`
    );

    const fetchedPizza = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?categoryName=${process.env.NEXT_PUBLIC_PIZZA}`
    );

    if (fetchedData.ok) {
      data = await fetchedData.json();
      kacchi = await fetchedKacchi.json();
      burger = await fetchedBurger.json();
      pizza = await fetchedPizza.json();
    }
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
      kacchi,
      burger,
      pizza,
    },
    revalidate: 60,
  };
}
