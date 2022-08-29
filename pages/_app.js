import dynamic from "next/dynamic";
import { Suspense } from "react";
//import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/globals.css";

const DynamicLayout = dynamic(() => import("../components/Layout"), {
  suspense: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DynamicLayout>
        <Component {...pageProps} />
      </DynamicLayout>
    </Suspense>
  );
}

export default MyApp;
