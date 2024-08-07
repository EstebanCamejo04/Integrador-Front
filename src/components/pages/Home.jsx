import React from "react";
import styles from "../../styles/Home.module.css";
import BigBannerCarousel from "../common/BigBannerCarousel";
import { bigbanner_info } from "../../utils/bigbanner_info";
import ProductList from "../common/ProductList";

const Home = () => {
  return (
    <div className={styles.bodyContainer}>
      <div className={styles.bodyHeader}>
        <h1 className={styles.h1BodyHeader}>fly mountain</h1>
        <h3 className={styles.h3BodyHeader}>-flies through the air-</h3>
      </div>
      <BigBannerCarousel info={bigbanner_info.home} />
      <ProductList />
    </div>
  );
};

export default Home;
