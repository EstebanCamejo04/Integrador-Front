import React from "react";
import ProductCard from "../productCard/ProductCard";
import productImage from "../../../public/images/hamaca.jpg";
import "./ProductList.css";

const ProductList = () => {
  return (
    <section>
      <ProductCard
        img={productImage}
        title={"Tarde en las hamacas voladoras"}
      />

      <ProductCard
        img={productImage}
        title={"Tarde en las hamacas voladoras"}
      />

      <ProductCard
        img={productImage}
        title={"Tarde en las hamacas voladoras"}
      />

      <ProductCard
        img={productImage}
        title={"Tarde en las hamacas voladoras"}
      />
    </section>
  );
};

export default ProductList;
