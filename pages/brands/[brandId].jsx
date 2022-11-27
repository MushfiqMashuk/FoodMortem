import autoAnimate from "@formkit/auto-animate";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProductCard from "../../components/ProductCard";
import Title from "../../components/Title";
import capitalize from "../../helpers/capitalize";
import { shimmer, toBase64 } from "../../helpers/shimmerEffect";
import No_Image from "../../public/no_image.png";
import styles from "./brands.module.scss";

function SingleBrand({ brand, products = [] }) {
  const router = useRouter();
  const [categoryValue, setCategoryValue] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const categoryOptions = brand?.categories?.map((category) => ({
    value: category,
    label: capitalize(category),
  }));

  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current, { duration: 500 });
    }
  }, [parentRef.current]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        categoryValue.find((item) => item.value.includes(product.category.name))
      )
    );
  }, [categoryValue]);

  const handleOnChange = (categoryValues) => {
    setCategoryValue(categoryValues);
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
          {brand.categories && brand.categories.length > 0 && (
            <Select
              closeMenuOnSelect={true}
              isMulti
              options={categoryOptions}
              placeholder="Select category..."
              onChange={handleOnChange}
            />
          )}
        </div>
        <div className={styles.body} ref={parentRef}>
          {categoryValue && categoryValue.length > 0
            ? filteredProducts &&
              filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <ProductCard product={product} key={product._id} page="brand" />
              ))
            : products &&
              products.length > 0 &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} page="brand" />
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
  let data;
  let products;

  try {
    // Fetching the brand
    const fetchedBrand = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/brands/${brandId}`
    );
    data = await fetchedBrand.json();

    // Fetching all the products with the brand id
    const fetchedProducts = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?brandId=${brandId}`
    );
    products = await fetchedProducts.json();
  } catch (err) {
    console.log(err);
  }

  if (!data._id) {
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
