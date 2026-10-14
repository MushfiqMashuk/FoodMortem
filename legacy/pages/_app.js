/**
 * App Name: FoodMortem
 * Author: Musfiq Ahmed Mashuk
 * Starting Date: 11-08-2022
 * License: MIT
 */

import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/globals.scss";
NProgress.configure({
  speed: 400,
  showSpinner: false,
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    router.events.on("routeChangeStart", () => {
      NProgress.start();
    });

    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });
  }, [setLoading, router.events]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Component {...pageProps} />
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default MyApp;
