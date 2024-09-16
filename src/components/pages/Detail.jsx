import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../common/BackButton";
import { useContextGlobal } from "../../context/Context";
import { featureIcons } from "../../utils/feature_icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../../styles/Detail.module.css";
import Modal from "react-modal";

// Fechas ocupadas harcodeadas
const occupiedDates = [
  new Date("2024-09-05T00:00:00"),
  new Date("2024-09-10T00:00:00"),
  new Date("2024-09-15T00:00:00"),
  new Date("2024-09-20T00:00:00"),
  new Date("2024-09-18T00:00:00"),
  new Date("2024-10-18T00:00:00"),
  new Date("2024-10-10T00:00:00"),
];

const availableHours = ["10:00", "13:00", "15:00", "17:00"];

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fetchDatesError, setFetchDatesError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reservationData, setReservationData] = useState(null);
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
        if (occupiedDates.length === 0) {
          throw new Error("No se pudieron cargar las fechas ocupadas");
        }
        handleDateChange(new Date());
      } catch (error) {
        console.error("Error fetching the product:", error);
        setFetchDatesError(true);
      }
    };

    fetchProduct();
  }, [id]);

  const handleRentClick = async () => {
    if (validUser || validAdmin) {
      const reservationInfo = {
        user_id: user.id,
        product_id: product.id,
        date_id: selectedDate.getTime(),
        slots_requested: 1,
      };

      setReservationData(reservationInfo);
      setModalIsOpen(true);

      try {
        // Hacer POST al backend para confirmar la reserva
        const response = await axios.post(
          "http://localhost:3000/api/reservations",
          reservationInfo
        );
        console.log("Reserva enviada exitosamente", response.data);
        alert("Reserva confirmada con éxito");
      } catch (error) {
        console.error("Error enviando la reserva:", error);
        alert("Hubo un error al confirmar la reserva.");
      }
    } else {
      alert("Debes iniciar sesión o registrarte para alquilar un producto.");
      navigate("/login");
    }
  };

  const handleDateChange = (date) => {
    if (
      date &&
      occupiedDates.some(
        (occupiedDate) =>
          new Date(occupiedDate).toDateString() ===
          new Date(date).toDateString()
      )
    ) {
      setError("La fecha seleccionada no tiene cupos, consulte otra.");
      setShowTimePicker(false);
      return;
    } else {
      setError(null);
      setShowTimePicker(true);
    }

    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setReservationData(null);
  };

  if (!product) {
    return <div>Cargando...</div>;
  }

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
        {/* Agregar la ubicación */}
        <p className={styles.paragraph}>
          <strong>Ubicación:</strong> {product.location}
        </p>
        {/* Agregar la información destacada */}
        <p className={styles.paragraph}>
          <strong>Información destacada:</strong> {product.highlightedInfo}
        </p>
        <button className={styles.button} onClick={handleRentClick}>
          Reservar
        </button>
      </div>
      <div className={styles.datePickerContainer}>
        <div className={styles.datePicker}>
          <h3 className={styles.titleTime}>Seleccionar fecha:</h3>
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
              minDate={new Date()}
              dayClassName={(date) => {
                const dateStr = new Date(date).toDateString();
                const isOccupied = occupiedDates.some(
                  (occupiedDate) =>
                    new Date(occupiedDate).toDateString() === dateStr
                );
                return isOccupied
                  ? styles["datepicker__day--highlighted"]
                  : undefined;
              }}
            />
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
            Su reserva será para la fecha: {selectedDate.toLocaleDateString()} a
            las {selectedTime}
          </p>
        </div>
      )}

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

      {/* Modal para mostrar la información de reserva */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Reservation Details"
      >
        <h2>Detalles de la Reserva</h2>
        {reservationData && product && (
          <div>
            <p>
              <strong>Nombre del Usuario:</strong> {user.name} {user.lastName}
            </p>
            <p>
              <strong>Actividad:</strong> {product.name}
            </p>
            <p>
              <strong>Fecha de Reserva:</strong>{" "}
              {new Date(reservationData.date_id).toLocaleDateString()}
            </p>
            <p>
              <strong>Slots Solicitados:</strong>{" "}
              {reservationData.slots_requested}
            </p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Detail;
