import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/Detail.module.css";
import BackButton from "../common/BackButton";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = () => {
      axios
        .get("/db.json")
        .then((response) => {
          const product = response.data.find((product) => product.id === id);
          setProduct(product);
        })
        .catch((error) => {
          console.error("Error fetching the product:", error);
        });
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.details}>
      <BackButton />
      <img src={product.image} alt={product.name} className={styles.img} />
      <div className={styles.products}>
        <h2>Plan: {product.name}</h2>
        <p className={styles.paragraph}>{product.description}</p>
        <p className={styles.paragraph}>Precio: ${product.price}</p>
        <button className={styles.button}>Alquilar</button>
      </div>
    </div>
  );
};

export default Detail;
