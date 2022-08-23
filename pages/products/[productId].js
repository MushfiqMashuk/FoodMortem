import React from "react";

function SingleProduct({ products }) {
  console.log(products);

  return <div>{`${products.brand} er ${products.name}`}</div>;
}

export default SingleProduct;

export async function getStaticPaths() {
  return {
    paths: [{ params: { productId: "1" } }, { params: { productId: "2" } }],
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const { productId } = params;

  const fetchedData = await fetch(
    `http://localhost:4000/products/${productId}`
  );
  const data = await fetchedData.json();

  return {
    props: {
      products: data,
    },
    revalidate: 60,
  };
}
