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
import styles from "./categories.module.scss";

function SingleCategory({ category, products = [] }) {
  const router = useRouter();
  const [brandValue, setBrandValue] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const parentRef = useRef(null);

  const brandOptions = products?.map((product) => ({
    value: product?.brand?.name,
    label: capitalize(product?.brand?.name),
  }));

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current, { duration: 500 });
    }
  }, [parentRef.current]);

  useEffect(() => {
    setFilteredProducts(
      products?.filter((product) =>
        brandValue.find((item) => item.value.includes(product.brand.name))
      )
    );
  }, [brandValue]);

  const handleOnChange = (categoryValues) => {
    setBrandValue(categoryValues);
  };

  if (router.isFallback) return <LoadingSpinner />;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.image_container}>
            <Image
              src={category.img ? category.img : No_Image}
              alt={category.name}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </div>
          <div className={styles.title}>
            <Title>{category.name}</Title>
          </div>
          <div className={styles.filters}>
            {brandOptions && brandOptions.length > 0 && (
              <Select
                className={styles.select}
                closeMenuOnSelect={true}
                isMulti
                options={brandOptions}
                placeholder="Select brand..."
                onChange={handleOnChange}
              />
            )}
          </div>
        </div>
        <hr />

        <div className={styles.body} ref={parentRef}>
          {brandValue && brandValue.length > 0
            ? filteredProducts &&
              filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <ProductCard
                  product={product}
                  key={product._id}
                  page="category"
                />
              ))
            : products &&
              products.length > 0 &&
              products.map((product) => (
                <ProductCard
                  product={product}
                  key={product._id}
                  page="category"
                />
              ))}
        </div>
      </div>
    </Layout>
  );
}

export default SingleCategory;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { categoryId } = params;
  let data;
  let products;

  try {
    // Fetching the category
    const fetchedBrand = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`
    );

    if (fetchedBrand.ok) {
      data = await fetchedBrand.json();
    } else {
      throw new Error("Internal server error!");
    }

    // Fetching all the products with the brand id
    const fetchedProducts = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?categoryId=${categoryId}`
    );

    if (fetchedProducts.ok) {
      products = await fetchedProducts.json();
    } else {
      throw new Error("Internal server error!");
    }
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
      category: data,
      products,
    },
    revalidate: 60,
  };
}
