import React from "react";
import styles from "../../styles/ProductCard.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ id, img, name }) => {
  return (
    <div className={styles.productCardContainer}>
      <div className={styles.imgContainer}>
        <img src={img} alt="Product image" className={styles.cardImg} />
      </div>
      <div className={styles.productCardInfo}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <Link to={`/detail/${id}`} className={styles.avoidLinkStyle}>
          <button className={styles.button}>Ver detalle</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
