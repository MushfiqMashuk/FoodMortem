import Image from "next/image";
import Link from "next/link";
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

function SingleBrand({ brand, products }) {
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
          {products &&
            products.map((product) => (
              <div className={styles.card_wrapper}>
                <div className={styles.product_card}>
                  <div className={styles.card_image_container}>
                    <Link href={`/products/${product.id}`}>
                      <a>
                        <Image
                          src={product.img}
                          layout="fill"
                          objectFit="cover"
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            shimmer(700, 475)
                          )}`}
                        />
                        <Overlay />
                      </a>
                    </Link>
                  </div>

                  <div className={styles.product_description}>
                    <div className={styles.product_rating}>
                      <Image src={StarIcon} height={22} width={22} />
                      <SubTitle>{product.rating}</SubTitle>
                    </div>
                    <div className={styles.product_info}>
                      <SubTitle>{product.name}</SubTitle>

                      <SubTitle>
                        {product.category.name
                          ? product.category.name
                          : product.category}
                      </SubTitle>
                    </div>
                    <div>
                      <AddToBucketListButton>BucketList</AddToBucketListButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

  // Fetching the brand
  const fetchedBrand = await fetch(`http://localhost:4000/brands/${brandId}`);
  const data = await fetchedBrand.json();

  // Fetching all the products with the brand id
  const fetchedProducts = await fetch(
    `http://localhost:4000/products?brand.id=${brandId}`
  );
  const products = await fetchedProducts.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      brand: data,
      products: products,
    },
    revalidate: 60,
  };
}
