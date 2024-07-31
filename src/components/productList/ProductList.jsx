import React from "react";
import ProductCard from "../productCard/ProductCard";
import productImage from "../../assets/productImage.png";
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
        description={
          "Veni a pasar una tarde inolvidable en las hamacas voladoras, donde vas a tener acceso a las mejores vistas del país acompañadas de una experiencia única en las alturas."
        }
      />

      <ProductCard
        img={productImage}
        title={"Tarde en las hamacas voladoras"}
        description={
          "Veni a pasar una tarde inolvidable en las hamacas voladoras, donde vas a tener acceso a las mejores vistas del país acompañadas de una experiencia única en las alturas."
        }
      />

      <ProductCard
        img={productImage}
        title={"Tarde en las hamacas voladoras"}
        description={
          "Veni a pasar una tarde inolvidable en las hamacas voladoras, donde vas a tener acceso a las mejores vistas del país acompañadas de una experiencia única en las alturas."
        }
      />
    </section>
  );
};

export default ProductList;
