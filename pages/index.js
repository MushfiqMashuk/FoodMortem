import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      Go to
      <Link href="/products">
        <a> Product </a>
      </Link>
      page
    </Layout>
  );
}
