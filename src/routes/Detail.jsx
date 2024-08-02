import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Details.css";

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
    <div className="details">
      <img src={product.image} alt={product.name} className="img" />

      <div className="products">
        <h2>Plan: {product.name}</h2>
        <p>{product.description}</p>
        <p>Precio: ${product.price}</p>
        <button>Alquilar</button>
      </div>
    </div>
  );
};

export default Detail;
