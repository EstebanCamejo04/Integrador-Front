import React from "react";
import "../../styles/ProductCard.css";

const ProductCard = ({ img, title }) => {
  return (
    <div className="productCardContainer">
      <img src={img} alt="Product image" />
      <div>
        <h3>{title}</h3>
        <button>Ver detalle</button>
      </div>
    </div>
  );
};

export default ProductCard;
