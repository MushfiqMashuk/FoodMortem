import Layout from "../../components/Layout";

const Products = ({ products }) => {
  return (
    <Layout>
      {products && products.map((product) => <div>{product.name}</div>)}
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
