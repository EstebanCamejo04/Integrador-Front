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

const availableHours = ["10:00", "13:00", "15:00", "17:00"];

const Detail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [error, setError] = useState(null);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [fetchDatesError, setFetchDatesError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { state } = useContextGlobal();
    const user = state.user ? state.user : {};
    const { validAdmin, validUser } = state;
    const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/${id}`
      );
      const productData = response.data;
      const features = productData.product_feature.map((pf) => ({
        icon: featureIcons[pf.feature.name_alias],
        text: pf.feature.name,
      }));
      if (containsAvailableDates(productData.product_date) == false) {
        setFetchDatesError(true);
      }
      setProduct({ ...productData, features });
    } catch (error) {
      setError(
        "No fue posible cargar la información del producto. Intenta nuevamente más tarde"
      );
    }
  };
  const getProductDate = (date) => {
    const res = product.product_date.find((productDate) => {
      return (
        new Date(productDate.date.date).toDateString() === date.toDateString()
      );
    });
    return res;
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

    const handleRentClick = () => {
        console.log("Estado del usuario:", validUser, validAdmin);
        console.log("Datos del usuario:", user);

        if (validUser || validAdmin) {
            setShowModal(true)
        } else {
            alert("Debes iniciar sesión o registrarte para alquilar un producto.");
            navigate("/login");
        }
    }

    const containsAvailableDates = (dates) => {
    return dates.some((productDate) => {
      return productDate.slots > 0;
    });
  };

  const isAvaiableDate = (date) => {
    const dateStr = new Date(date).toDateString();
    const isAvailable = product
      ? product.product_date.some((productDate) => {
          return (
            new Date(productDate.date.date).toDateString() === dateStr &&
            productDate.slots > 0
                );
            })
            : false;
        return isAvailable;
    };

    const handleCloseModal = () => setShowModal(false);

    const handleDateChange = (date) => {
        if (date && !isAvaiableDate(date)) {
            setError("La fecha seleccionada no tiene cupos, consulte otra.");
            setShowTimePicker(false);
            setSelectedDate(null);
        } else {
            setError(null);
            setShowTimePicker(true);
            setSelectedDate(date);
        }
        setSelectedTime(null);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
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
                    >
                        Reservar
                    </button>
                </div>
                <div className={styles.datePickerContainer}>
                    <div className={styles.datePicker}>
                        {fetchDatesError ? (
              <p>
                No hay fechas disponibles, consulte la agenda en otro momento
                por favor, gracias.
              </p>
            ) : (
              <>
                <h3 className={styles.titleTime}>Seleccionar fecha:</h3>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  inline
                  minDate={new Date()}
                  dayClassName={(date) => {
                    return !isAvaiableDate(date)
                      ? styles["datepicker__day--highlighted"]
                      : undefined;
                  }}
                                    />
                                </>
                            )}
                    </div>
                    {showTimePicker && (
                        <div className={styles.timePicker}>
                            <h3 className={styles.titleTime}>Seleccionar hora:</h3>
                            <div className={styles.timeButtons}>
                                {availableHours.map((hour, index) => (
                                    <label key={index} className={styles.timeButton}>
                                        <input
                                            type="radio"
                                            name="time"
                                            value={hour}
                                            checked={selectedTime === hour}
                                            onChange={handleTimeChange}
                                            className={styles.radioInput}
                                        />
                                        {hour}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                    {error && <div className={styles.error}>{error}</div>}
                </div>
                {selectedDate && selectedTime && (
                    <div className={styles.selectedDateTime}>
                        <p>
                            Su reserva sera para la fecha: {selectedDate.toLocaleDateString()}{" "}
                            a las {selectedTime}
                        </p>
                    </div>
                )}

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
                        time={selectedTime}
                        getProductDate={getProductDate}
                    />
                )}
            </div>
        );}
};

export default Detail;
