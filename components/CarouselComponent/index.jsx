import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NoProduct from "../NoProduct";
import SuggestProductButton from "../SuggestProductButton";
import styles from "./carouselComponent.module.scss";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function CarouselComponent({
  products = [],
  noProductText,
  rating = null,
  CardComponent,
  topRated,
  brandCard,
}) {
  return (
    <div>
      {products && products.length > 0 ? (
        <Carousel
          swipeable={false}
          draggable={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          keyBoardControl={true}
          customTransition="transform 300ms ease-in-out"
          transitionDuration={500}
          containerClass={
            brandCard
              ? styles.carousel_container_brand
              : styles.carousel_container
          }
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          centerMode={true}
          itemClass={styles.carousel_list}
        >
          {products &&
            products.map((product) => (
              <CardComponent
                product={product}
                rating={rating && rating}
                topRated={topRated}
              />
            ))}
          {/* {products &&
            products.map((product) => <ProductCard product={product} rating={rating && rating}/>)} */}
        </Carousel>
      ) : (
        <NoProduct text={noProductText}>
          <SuggestProductButton/>
        </NoProduct>
      )}
    </div>
  );
}

export default CarouselComponent;
