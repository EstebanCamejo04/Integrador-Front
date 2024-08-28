import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/Detail.module.css";
import BackButton from "../common/BackButton";
import { useContextGlobal } from "../../context/Context";
import { featureIcons } from "../../utils/feature_icons";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { state } = useContextGlobal();
  const user = state.user ? state.user : {};
  const { validAdmin, validUser } = state;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );

        const productData = response.data;
        console.log(response.data);
        // Aca le estoy pegando a las features
        const features = productData.product_feature.map((pf) => ({
          icon: featureIcons[pf.feature.name_alias], // Mientras no hay iconos
          text: pf.feature.name, //
        }));
        console.log(productData);
        console.log(features);

        setProduct({ ...productData, features });
      } catch (error) {
        console.error("Error fetching the product:", error);
      }
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
      <img
        src={`https://fly-mountain-app.s3.us-east-2.amazonaws.com/images/product${product.id}.jpg`}
        alt={product.category.name}
        className={styles.img}
      />
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
