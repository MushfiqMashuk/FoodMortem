import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      NProgress.start();
      console.log("Route change starts");
    });

    router.events.on("routeChangeComplete", () => {
      NProgress.done();
      console.log("Route change ends");
    });
  });

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
