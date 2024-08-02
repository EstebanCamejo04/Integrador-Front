import React from "react";
import ProductCard from "./ProductCard";
import "../../styles/ProductList.css";

const ProductList = () => {
  return (
    <section>
      <h2>Experiencias recomendadas</h2>
      <div className="productList">
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
      </div>
    </section>
  );
};

export default ProductList;
