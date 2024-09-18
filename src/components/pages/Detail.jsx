import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../common/BackButton";
import { useContextGlobal } from "../../context/Context";
import { featureIcons } from "../../utils/feature_icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Detail.module.css";
import ReservationModal from "../common/ReservationModal";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [fetchDatesError, setFetchDatesError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [productTime, setProductTime] = useState(null);
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
        console.log("Product data:", productData);
        // Aca le estoy pegando a las features
        const features = productData.product_feature.map((pf) => ({
          icon: featureIcons[pf.feature.name_alias], // Mientras no hay iconos
          text: pf.feature.name, //
        }));
        setProduct({ ...productData, features });
        handleDateChange(new Date());
      } catch (error) {
        console.error("Error fetching the product:", error);
        setFetchDatesError(true);
      }
    };

    fetchProduct();
  }, [id]);

  const getDateData = (date) => {
    const dateStr = date.toISOString().split("T")[0];

    const result = product?.product_date.find(
      (productDate) =>
        new Date(productDate.date.date).toISOString().split("T")[0] === dateStr
    );

    // Devuelve el objeto con date_id y los datos encontrados, o null si no se encuentra
    return result ? { date_id: result.date_id, dateData: result } : null;
  };

  const handleRentClick = () => {
    console.log("Estado del usuario:", validUser, validAdmin);
    console.log("Datos del usuario:", user);

    if (validUser || validAdmin) {
      setShowModal(true);
    } else {
      alert("Debes iniciar sesión o registrarte para alquilar un producto.");
      navigate("/login");
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      const selectedDateStr = date.toISOString().split("T")[0];

      const dateData = product?.product_date.find((productDate) => {
        const productDateStr = new Date(productDate.date.date)
          .toISOString()
          .split("T")[0];
        return productDateStr === selectedDateStr; // Comparo fechas en formato 'YYYY-MM-DD'
      });

      if (dateData) {
        setAvailableSlots(dateData.slots || 0);
        setError(null);
        const productDateTime = new Date(dateData.date.date);
        setProductTime(
          productDateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } else {
        setAvailableSlots(0);
        setError(
          "La fecha seleccionada no tiene disponibilidad, seleccione otra por favor."
        );
        setProductTime(null);
      }
      setSelectedDate(date);
    } else {
      setAvailableSlots(0);
      setError(null);
      setSelectedDate(null);
      setProductTime(null);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const isDateAvailable = (date) => {
    const dateData = getDateData(date);
    return dateData && dateData.dateData.slots > 0;
  };
  if (!product) {
    return <div>Cargando...</div>;
  } else {
    return (
      <div className={styles.details}>
        <BackButton />
        <img
          src={`https://fly-mountain-app.s3.us-east-2.amazonaws.com/${product.imageKey}`}
          alt={product.category.name}
          className={styles.img}
        />
        <div className={styles.products}>
          <h2>Plan: {product.name}</h2>
          <p className={styles.paragraph}>{product.description}</p>
          <p className={styles.paragraph}>Precio: ${product.price}</p>
          <button
            className={
              styles.button + " " + (!selectedDate ? styles.disableButton : "")
            }
            onClick={handleRentClick}
            disabled={availableSlots === 0}
          >
            Reservar
          </button>
        </div>
        <div className={styles.datePickerContainer}>
          <div className={styles.datePicker}>
            <h3>Bienvenido a nuestra agenda de reservas</h3>
            <p>
              En este apartado podra observar las fechas disponibles que
              contamos de cada producto, seleccione el dia, observe el horario
              determinado y luego de seleccionado dirigase a el boton de
              reservar, muchas gracias.
            </p>
            <h4 className={styles.titleTime}>Seleccionar fecha:</h4>
            {fetchDatesError ? (
              <p>
                Ocurrio un error, consulte la agenda en otro momento por favor,
                gracias.
              </p>
            ) : (
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
                //monthsShown={2} // pa mostrar 2 meses
                minDate={new Date()}
                dayClassName={(date) => {
                  const today = new Date();
                  const dateData = getDateData(date);
                  if (date < today) {
                    return styles["datepicker__day--disabled"];
                  }
                  if (dateData && dateData.dateData.slots > 0) {
                    return styles["datepicker__day--available"];
                  } else {
                    return styles["datepicker__day--unavailable"];
                  }
                }}
              />
            )}
          </div>
          {error && <div className={styles.error}>{error}</div>}
          {selectedDate && availableSlots > 0 && (
            <div className={styles.selectedDateTime}>
              <p>
                Su reserva será para la fecha:{" "}
                {selectedDate.toLocaleDateString()} a las{" "}
                {productTime ? productTime : "hora no disponible"}
              </p>
            </div>
          )}
        </div>

        <div className={styles.features}>
          <h3 className={styles.title}>Características:</h3>
          <ul className={styles.list}>
            {product.features.map((feature, index) => (
              <li key={index} className={styles.featureItem}>
                <span className={styles.icon}>{feature.icon}</span>{" "}
                {feature.text}
              </li>
            ))}
          </ul>
        </div>
        {showModal && (
          <ReservationModal
            show={showModal}
            handleClose={handleCloseModal}
            user={user}
            product={product}
            date={selectedDate}
            time={productTime}
            getDateData={getDateData}
            availableSlots={availableSlots}
          />
        )}
      </div>
    );
  }
};

export default Detail;
