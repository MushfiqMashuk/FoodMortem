import Layout from "../../components/Layout";
import ProductCard from "../../components/ProductCard";
import styles from "./allProducts.module.scss";

const Products = ({ products }) => {
  return (
    <Layout>
      <div className={styles.container}>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  let data;
  try {
    const fetchedData = await fetch(`http://localhost:4000/products`);
    data = await fetchedData.json();
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

export default Products;
