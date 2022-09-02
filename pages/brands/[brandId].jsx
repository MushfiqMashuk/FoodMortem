function SingleBrand({ brand }) {
  return (
    <div>
      This is page of <h3>{brand.name}</h3>
    </div>
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

  const fetchedData = await fetch(`http://localhost:4000/brands/${brandId}`);
  const data = await fetchedData.json();

  // if (!data.id) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      brand: data,
    },
    revalidate: 60,
  };
}
