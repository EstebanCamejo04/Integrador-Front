import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/Detail.module.css";
import BackButton from "../common/BackButton";
import { useContextGlobal } from "../../context/Context";

//caracteristicas harcodeadasss
const hardcodedFeatures = [
  { icon: "🔥", text: "Caracteristica 1" },
  { icon: "⏱️", text: "Caracteristica 2" },
  { icon: "💼", text: "Caracteristica 3" },
  { icon: "💰", text: "Caracteristica 4" },
  { icon: "💰", text: "Caracteristica 5" },
  { icon: "💰", text: "Caracteristica 6" },
  { icon: "💰", text: "Caracteristica 7" },
  { icon: "💰", text: "Caracteristica 8" },
];

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { state } = useContextGlobal();
  const user = state.user ? state.user : {};
  const { validAdmin, validUser } = state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = () => {
      axios
        .get("/db.json")
        .then((response) => {
          const product = response.data.find((product) => product.id === id);
          setProduct(product);
          if (product) {
            setProduct({ ...product, features: hardcodedFeatures });
          }
        })
        .catch((error) => {
          console.error("Error fetching the product:", error);
        });
    };

    fetchProduct();
  }, [id]);
  const handleRentClick = () => {
    if (validUser || validAdmin) {
      alert("Reserva realizada con éxito, gracias por confiar en nosotros!");
    } else {
      alert("Debes iniciar sesión o registrarte para alquilar un producto.");
      navigate("/login");
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
          Reservar
        </button>
      </div>
      <div className={styles.features}>
        <h3 className={styles.title}>Características:</h3>
        <ul className={styles.list}>
          {product.features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <span className={styles.icon}>{feature.icon}</span> {feature.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Detail;
