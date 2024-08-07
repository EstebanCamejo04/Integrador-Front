import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../../styles/ProductList.module.css";
import axios from "axios";

const ProductList = () => {
  const [productList, setProductList] = useState(null);
  const [shuffledProductList, setShuffledProductList] = useState(null);

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

  useEffect(() => {
    const fetchProductList = () => {
      axios
        .get("/db.json")
        .then((response) => {
          setProductList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching the product list:", error);
        });
    };

    fetchProductList();
  }, []);

  useEffect(() => {
    productList && setShuffledProductList(shuffleArray(productList));
  }, [productList]);

  if (!shuffledProductList) {
    return <div>Cargando...</div>;
  }

  return (
    <section className={styles.productListContainer}>
      <h2 className={styles.productListTitle}>Experiencias recomendadas</h2>
      <div className={styles.productList}>
        {shuffledProductList.map(({ id, name, image }) => {
          return <ProductCard key={id} id={id} img={image} name={name} />;
        })}
      </div>
    </section>
  );
};

export default ProductList;
