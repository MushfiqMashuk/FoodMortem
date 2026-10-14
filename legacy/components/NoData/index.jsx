import Image from "next/image";
import NoDataImage from "../../public/no_data.svg";
import styles from "./noData.module.scss";

function NoData({
  text = "Sorry! No products to show right now.",
  children,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.image_container}>
        <Image src={NoDataImage} height={150} width={150} />
      </div>
      <div className={styles.text_container}>
        <p className="no_data_text">{text}</p>
      </div>
      {children ? children : null}
    </div>
  );
}

export default NoData;
