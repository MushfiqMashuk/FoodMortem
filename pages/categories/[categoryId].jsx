import { useRouter } from "next/router";
import LoadingSpinner from "../../components/LoadingSpinner";

function SingleCategory({ category }) {
  const router = useRouter();

  if (router.fallback) return <LoadingSpinner />;

  return (
    <div>
      This is the page of <h3>{category.name}</h3>
    </div>
  );
}

export default SingleCategory;

export async function getStaticPaths() {
  return {
    paths: [{ params: { categoryId: "2" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { categoryId } = params;

  const fetchedData = await fetch(
    `http://localhost:4000/categories/${categoryId}`
  );
  const data = await fetchedData.json();

  // if (!data.id) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      category: data,
    },
    revalidate: 60,
  };
}
