import React from "react";
import ProductCard from "./ProductCard";
import styles from "../../styles/ProductList.module.css";
import { useContextGlobal } from "../../context/Context";

const ProductList = () => {
  const { state } = useContextGlobal();

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  if (!state.products) {
    return <div>Cargando...</div>;
  }

  return (
    <section className={styles.productListContainer}>
      <h2 className={styles.productListTitle}>Experiencias recomendadas</h2>
      <div className={styles.productList}>
        {shuffleArray(state.products).map(({ id, name, image }) => {
          return <ProductCard key={id} id={id} img={image} name={name} />;
        })}
      </div>
    </section>
  );
};

export default ProductList;
