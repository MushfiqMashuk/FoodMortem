import autoAnimate from "@formkit/auto-animate";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProductCard from "../../components/ProductCard";
import Title from "../../components/Title";
import { shimmer, toBase64 } from "../../helpers/shimmerEffect";
import No_Image from "../../public/no_image.png";
import styles from "./brands.module.scss";

function SingleBrand({ brand, products = [] }) {
  const router = useRouter();
  const [categoryValue, setCategoryValue] = useState();
  const [filteredProducts, setFilteredProducts] = useState(products);

  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current, { duration: 500 });
    }
  }, [parentRef.current]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product?.category?.name?.includes(categoryValue)
      )
    );
  }, [categoryValue]);

  const handleOnChange = (e) => {
    setCategoryValue(e.target.value);
  };

  if (router.isFallback) return <LoadingSpinner />;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.image_container}>
            <Image
              src={brand.img ? brand.img : No_Image}
              alt={brand.name}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </div>
          <div className={styles.title}>
            <Title>{brand.name}</Title>
          </div>
          <div className={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus,
            nobis cumque. Et, velit tempore dolorem atque corrupti quasi, ut
            blanditiis corporis aut in quam. Illum dolor eos possimus fugit
            dolore!
          </div>
        </div>
        <hr />
        <div className={styles.filters}>
          <select value={categoryValue} onChange={handleOnChange}>
            <option value="">All Categories</option>
            <option value="frozen food">Frozen Food</option>
            <option value="biscuit">Biscuit</option>
            <option value="cake">Cake</option>
          </select>
        </div>
        <div className={styles.body} ref={parentRef}>
          {categoryValue
            ? filteredProducts &&
              filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <ProductCard product={product} key={product.id} singleProduct />
              ))
            : products &&
              products.length > 0 &&
              products.map((product) => (
                <ProductCard product={product} key={product.id} singleProduct />
              ))}
        </div>
      </div>
    </Layout>
  );
}

export default SingleBrand;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { brandId } = params;

  // Fetching the brand
  const fetchedBrand = await fetch(`http://localhost:4000/brands/${brandId}`);
  const data = await fetchedBrand.json();

  // Fetching all the products with the brand id
  const fetchedProducts = await fetch(
    `http://localhost:4000/products?brand.id=${brandId}`
  );
  const products = await fetchedProducts.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      brand: data,
      products: products,
    },
    revalidate: 60,
  };
}
