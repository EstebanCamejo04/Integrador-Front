import React from "react";
import "../../styles/App.css";
import BigBannerCarousel from "../common/BigBannerCarousel";
import { bigbanner_info } from "../../utils/bigbanner_info";
import ProductList from "../common/ProductList";

const Home = () => {
  return (
    <div className="body-container">
      <div className="body-header">
        <h1 className="h1-body-header">fly mountain</h1>
        <h3 className="h3-body-header">-flies through the air-</h3>
      </div>
      <BigBannerCarousel info={bigbanner_info.home} />
      <ProductList />
    </div>
  );
};

export default Home;
