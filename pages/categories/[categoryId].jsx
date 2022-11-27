import Image from "next/image";
import { useRouter } from "next/router";
import Select from "react-select";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProductCard from "../../components/ProductCard";
import Title from "../../components/Title";
import capitalize from "../../helpers/capitalize";
import { shimmer, toBase64 } from "../../helpers/shimmerEffect";
import No_Image from "../../public/no_image.png";
import styles from "./categories.module.scss";

function SingleCategory({ category, products }) {
  const router = useRouter();

  const brandOptions = products?.map((product) => ({
    value: product?.brand?.name,
    label: capitalize(product?.brand?.name),
  }));


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
          <div className={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus,
            nobis cumque. Et, velit tempore dolorem atque corrupti quasi, ut
            blanditiis corporis aut in quam. Illum dolor eos possimus fugit
            dolore!
          </div>
        </div>
        <hr />
        <div className={styles.filters}>
          {
            <Select
              closeMenuOnSelect={true}
              isMulti
              options={brandOptions}
              placeholder="Select brand..."
              // onChange={handleOnChange}
            />
          }
        </div>
        <div className={styles.body}>
          {products &&
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
      throw new Error("Internal server error!")
    }

    // Fetching all the products with the brand id
    const fetchedProducts = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?categoryId=${categoryId}`
    );

    // // Fetching all the brands with the category name
    // const fetchedBrands = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/brands?categoryName=${categoryId}`
    // );

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
