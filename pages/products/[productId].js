import React from 'react';

function SingleProduct({data}) {

console.log(data);
    
  return (
    <div>SingleProduct</div>
  )
}

export default SingleProduct

export function getStaticPaths() {

    return {
        paths: [
            {params: {productId: 1}}
        ]

    }

}

export async function getStaticProps({params}) {
    const {productId} = params;

    const fetchedData = await fetch(`http://localhost:4000/products/${productId}`);
    const data = await fetchedData.json();

    return {
        props: {
            products: data
        },
        revalidate: 60
    }
}