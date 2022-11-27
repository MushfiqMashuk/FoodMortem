import { useEffect, useState } from "react";
import Select from "react-select";
import Layout from "../../components/Layout";
import ProductCard from "../../components/ProductCard";
import styles from "./allProducts.module.scss";

const Products = ({ products, brands, categories }) => {
  const brandOptions = brands.map((brand) => ({
    value: brand.name,
    label: brand.name,
  }));

  const categoryOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  const [categoryValue, setCategoryValue] = useState([]);
  const [brandValue, setBrandValue] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        brandValue.find((item) => item.value.includes(product.brand.name))
      )
    );
  }, [brandValue]);

  const handleBrandChange = (brandValues) => {
    setBrandValue(brandValues);
  };
  const handleCategoryChange = (categoryValues) => {
    setCategoryValue(categoryValues);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.filter_container}>
          <div className={styles.brand_filter}>
            <p>Sort By Brand Name</p>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={brandOptions}
              placeholder="Select brand..."
              onChange={handleBrandChange}
            />
          </div>
          <div className={styles.category_filter}>
            <p>Sort By Category Name</p>
            <Select
              closeMenuOnSelect={false}
              isMulti
              options={categoryOptions}
              placeholder="Select category..."
              onChange={handleCategoryChange}
            />
          </div>
        </div>
        <div className={styles.body}>
          {brandValue && brandValue.length > 0
            ? filteredProducts &&
              filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))
            : products &&
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
  let brands;
  let categories;
  try {
    const fetchedData = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`
    );
    const fetchedBrands = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/brands`
    );
    const fetchedCategories = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );

    if (fetchedData.ok) {
      data = await fetchedData.json();
      brands = await fetchedBrands.json();
      categories = await fetchedCategories.json();
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
      brands,
      categories,
    },
    revalidate: 60,
  };
}

export default Products;
