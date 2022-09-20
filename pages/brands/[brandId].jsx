import Image from "next/image";
import { useRouter } from "next/router";
import AddToBucketListButton from "../../components/AddToBucketListButton";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import Overlay from "../../components/Overlay";
import SubTitle from "../../components/SubTitle";
import Title from "../../components/Title";
import { shimmer, toBase64 } from "../../helpers/shimmerEffect";
import No_Image from "../../public/no_image.png";
import StarIcon from "../../public/star_icon6.svg";
import styles from "./brands.module.scss";

function SingleBrand({ brand }) {
  const router = useRouter();

  if (router.isFallback) return <LoadingSpinner />;

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.image_container}>
            <Image
              src={brand.img ? brand.img : No_Image}
              alt={brand.name}
              layout="fill"
              objectFit="contain"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </div>
          <div className={styles.title}>
            <Title>{brand.name}</Title>
          </div>
          <div className={styles.description}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus,
            nobis cumque. Et, velit tempore dolorem atque corrupti quasi, ut
            blanditiis corporis aut in quam. Illum dolor eos possimus fugit
            dolore!
          </div>
        </div>
        <hr />
        <div className={styles.body}>
          <div className={styles.card_wrapper}>
            <div className={styles.product_card}>
              {/* <Link href={`/products/5`}>
              <a>
                
              </a>
            </Link> */}
              <div className={styles.card_image_container}>
                <Image
                  src={"https://i.ibb.co/HFMpQqM/sultan-dines.jpg"}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                />
                <Overlay />
              </div>

              <div className={styles.product_description}>
                <div className={styles.product_rating}>
                  <Image src={StarIcon} height={22} width={22} />
                  <SubTitle>9.5</SubTitle>
                </div>
                <div className={styles.product_info}>
                  <SubTitle>Honeycomb</SubTitle>

                  <SubTitle>Bread</SubTitle>
                </div>
                <div>
                  <AddToBucketListButton />
                </div>
              </div>
            </div>
          </div>

          {/* <div className={styles.product_card}>
            <div className={styles.card_image_container}>
              <Image
                src={"https://i.ibb.co/NVyd6Tc/honey-comb.png"}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </div>
            <hr />
            <div className={styles.product_description}>
              <div className={styles.product_info}>
                <SubTitle>Honeycomb</SubTitle>
                <SubTitle>Bread</SubTitle>
              </div>
              <div className={styles.product_rating}></div>
            </div>
          </div>

          <div className={styles.product_card}>
            <div className={styles.card_image_container}>
              <Image
                src={"https://i.ibb.co/NVyd6Tc/honey-comb.png"}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </div>
            <hr />
            <div className={styles.product_description}>
              <div className={styles.product_info}>
                <SubTitle>Honeycomb</SubTitle>
                <SubTitle>Bread</SubTitle>
              </div>
              <div className={styles.product_rating}></div>
            </div>
          </div>

          <div className={styles.product_card}>
            <div className={styles.card_image_container}>
              <Image
                src={"https://i.ibb.co/NVyd6Tc/honey-comb.png"}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </div>
            <hr />
            <div className={styles.product_description}>
              <div className={styles.product_info}>
                <SubTitle>Honeycomb</SubTitle>
                <SubTitle>Bread</SubTitle>
              </div>
              <div className={styles.product_rating}></div>
            </div>
          </div>

          <div className={styles.product_card}>
            <div className={styles.card_image_container}>
              <Image
                src={"https://i.ibb.co/NVyd6Tc/honey-comb.png"}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </div>
            <hr />
            <div className={styles.product_description}>
              <div className={styles.product_info}>
                <SubTitle>Honeycomb</SubTitle>
                <SubTitle>Bread</SubTitle>
              </div>
              <div className={styles.product_rating}></div>
            </div>
          </div>

          <div className={styles.product_card}>
            <div className={styles.card_image_container}>
              <Image
                src={"https://i.ibb.co/NVyd6Tc/honey-comb.png"}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </div>
            <hr />
            <div className={styles.product_description}>
              <div className={styles.product_info}>
                <SubTitle>Honeycomb</SubTitle>
                <SubTitle>Bread</SubTitle>
              </div>
              <div className={styles.product_rating}></div>
            </div>
          </div>

          <div className={styles.product_card}>
            <div className={styles.card_image_container}>
              <Image
                src={"https://i.ibb.co/NVyd6Tc/honey-comb.png"}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </div>
            <hr />
            <div className={styles.product_description}>
              <div className={styles.product_info}>
                <SubTitle>Honeycomb</SubTitle>
                <SubTitle>Bread</SubTitle>
              </div>
              <div className={styles.product_rating}></div>
            </div>
          </div>

          <div className={styles.product_card}>
            <div className={styles.card_image_container}>
              <Image
                src={"https://i.ibb.co/NVyd6Tc/honey-comb.png"}
                layout="fill"
                objectFit="contain"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </div>
            <hr />
            <div className={styles.product_description}>
              <div className={styles.product_info}>
                <SubTitle>Honeycomb</SubTitle>
                <SubTitle>Bread</SubTitle>
              </div>
              <div className={styles.product_rating}></div>
            </div>
          </div> */}
        </div>
      </div>
    </Layout>
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

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      brand: data,
    },
    revalidate: 60,
  };
}
