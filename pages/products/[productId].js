import React from "react";
import {useRouter} from "next/router";

function SingleProduct({ products }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return <div>{`${products.brand} er ${products.name}`}</div>;
}

export default SingleProduct;

export async function getStaticPaths() {
  // const fetchedData = await fetch(
  //   `http://localhost:4000/products`
  // );
  // const data = await fetchedData.json();

  // const paths = data.map((product) => ({
  //   params: { productId: `${product.id}` },
  // }));

  return {
    paths: [{ params: { productId: "1" } }],
    fallback: true,
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
