import Select from "react-select";
import Layout from "../../components/Layout";
import ProductCard from "../../components/ProductCard";
import styles from "./allProducts.module.scss";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
  { value: "chocolat", label: "Chocolate" },
  { value: "strawbery", label: "Strawberry" },
  { value: "vanill", label: "Vanilla" },
  { value: "chocoate", label: "Chocolate" },
  { value: "straberry", label: "Strawberry" },
  { value: "vanlla", label: "Vanilla" },
  { value: "chcolate", label: "Chocolate" },
  { value: "srawberry", label: "Strawberry" },
  { value: "anilla", label: "Vanilla" },
];

const Products = ({ products }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.filter_container}>
          <div className={styles.brand_filter}>
            <p>Sort By Brand Name</p>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={options}
              placeholder="Select brand..."
            />
          </div>
          <div className={styles.category_filter}>
            <p>Sort By Category Name</p>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={options}
              placeholder="Select category..."
            />
          </div>
        </div>
        <div className={styles.body}>
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  let data;
  try {
    const fetchedData = await fetch(`http://localhost:3000/api/products`);
    console.log(fetchedData);
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
