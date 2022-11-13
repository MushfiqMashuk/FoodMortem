import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";

function SingleCategory({ category }) {
  const router = useRouter();

  if (router.isFallback) return <LoadingSpinner />;

  return (
    <Layout>
      This is the page of <h3>{category.name}</h3>
    </Layout>
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
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`
  );
  const data = await fetchedData.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category: data,
    },
    revalidate: 60,
  };
}
