import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import ProductCard from "../../components/ProductCard";
import checkUserLogin from "../../helpers/checkUserLogin";
import useBucketListStore from "../../store/useBucketListStore";
import styles from "./bucketlist.module.scss";

function BucketList() {
  const router = useRouter();
  const [bucketList, setBucketList] = useBucketListStore((state) => [
    state.bucketList,
    state.setBucketList,
  ]);
  //const [bucketList, setBucketList] = useState([]);

  useEffect(() => {
    const loggedInUser = checkUserLogin();

    // if (loggedInUser) {
    //   console.log(loggedInUser.userId);
    //   console.log(router.query._usr);
    //   userId =
    //     loggedInUser.userId === router.query[process.env.USER]
    //       ? loggedInUser.userId
    //       : null;
    // }

    const getBucketList = async () => {
      let data;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bucketList?userId=${loggedInUser.userId}`
        );

        if (response.ok) {
          data = await response.json();
          console.log(data);
          setBucketList(data?.bucketList);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (loggedInUser) {
      getBucketList();
    } else {
      router.push("/");
    }
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.info}>
            <div className={styles.name}></div>
            <div className={styles.brand_name}></div>
          </div>
        </div>
        <div className={styles.filter}></div>
        <div className={styles.body}>
          {bucketList &&
            bucketList.map((item) => (
              <ProductCard
                key={item.productId}
                product={item}
                bucketListPage={true}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }) {
//   const { userId } = params;
//   let data;
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/bucketList?userId=${userId}`
//     );
//     console.log(response);

//     if (response.ok) {
//       data = await response.json();
//     }
//   } catch (err) {
//     console.log(err);
//   }

//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       bucketList: data?.bucketList,
//     },
//     revalidate: 60,
//   };
// }

export default BucketList;
