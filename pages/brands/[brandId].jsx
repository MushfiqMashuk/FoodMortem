import { useRouter } from "next/router";
import LoadingSpinner from "../../components/LoadingSpinner";

function SingleBrand({ brand }) {
  const router = useRouter();

  if (router.fallback) return <LoadingSpinner />;

  return (
    <div>
      This is page of <h3>{brand.name}</h3>
    </div>
  );
}

export default SingleBrand;

export async function getStaticPaths() {
  return {
    paths: [{ params: { brandId: "2" } }],
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
