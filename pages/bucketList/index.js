import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import ProductCard from "../../components/ProductCard";
import checkUserLogin from "../../helpers/checkUserLogin";
import useBucketListStore from "../../store/useBucketListStore";
import styles from "./bucketlist.module.scss";

function BucketList() {
  const router = useRouter();
  const loggedInUser = checkUserLogin();
  // const [bucketList, setBucketList] = useBucketListStore((state) => [
  //   state.bucketList,
  //   state.setBucketList,
  // ]);
  //const [bucketList, setBucketList] = useState([]);

  let userBucketList;

  if (loggedInUser) {
    const [bucketList, setBucketList] = useBucketListStore((state) => [
      state.bucketList,
      state.setBucketList,
    ]);

    userBucketList = bucketList;

    useEffect(() => {
      const getBucketList = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/bucketList?userId=${loggedInUser.userId}`
          );

          const data = await response.json();

          if (response.ok) {
            setBucketList(data.bucketList);
          }
        } catch (err) {
          console.log(err);
        }
      };

      getBucketList();
    }, []);
  } else {
    router.push("/");
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.info}>
            <div className={styles.name}>Mushfiq mashuk</div>
            <div className={styles.bucket_list}>
              <p>Bucket List</p>
            </div>
          </div>
        </div>
        <div className={styles.filter}></div>
        <div className={styles.body}>
          {userBucketList &&
            userBucketList.map((item) => (
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
