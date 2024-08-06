import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import styles from "../../styles/Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
