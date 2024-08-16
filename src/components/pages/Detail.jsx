import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/Detail.module.css";
import BackButton from "../common/BackButton";
import { useContextGlobal } from "../../context/Context";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { state } = useContextGlobal();
  const user = state.user ? state.user : {};
  const role = user.role_id;
  const navigate = useNavigate();

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
  const handleRentClick = () => {
    if (!role) {
      alert("Debes iniciar sesión o registrarte para alquilar un producto.");
      navigate("/login");
    } else {
      alert("Reserva realizada con éxito, gracias por confiar en nosotros!");
    }
  };

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
        <button className={styles.button} onClick={handleRentClick}>
          Alquilar
        </button>
      </div>
    </div>
  );
};

export default Detail;
