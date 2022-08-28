import Footer from "../Footer";
import Navbar from "../Navbar";
import styles from "./layout.module.scss";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className={styles.body}>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
