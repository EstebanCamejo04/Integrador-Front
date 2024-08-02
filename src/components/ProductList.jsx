import React from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductList.css";

const ProductList = () => {
  return (
    <section>
      <ProductCard
        img={"/images/hamaca.jpg"}
        title={"Tarde en las hamacas voladoras"}
      />

      <ProductCard
        img={"/images/hamaca.jpg"}
        title={"Tarde en las hamacas voladoras"}
      />

      <ProductCard
        img={"/images/hamaca.jpg"}
        title={"Tarde en las hamacas voladoras"}
      />

      <ProductCard
        img={"/images/hamaca.jpg"}
        title={"Tarde en las hamacas voladoras"}
      />
    </section>
  );
};

export default ProductList;
