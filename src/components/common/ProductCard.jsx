import React from "react";
import "../../styles/ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ id, img, name }) => {
  return (
    <div className="productCardContainer">
      <img src={img} alt="Product image" />
      <div>
        <h3>{name}</h3>
        <Link to={`/detail/${id}`}>
          <button>Ver detalle</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
