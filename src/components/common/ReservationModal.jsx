import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useContextGlobal } from "../../context/Context";
import styles from "../../styles/ReservationModal.module.css";

const ReservationModal = ({
  show,
  handleClose,
  product,
  user,
  date,
  time,
  getDateData,
  availableSlots,
}) => {
  const { state, addReservation } = useContextGlobal();
  const [slotsRequested, setSlotsRequested] = useState(1);

  const handleSlotChange = (e) => {
    setSlotsRequested(e.target.value);
  };

  const handleConfirmReservation = () => {
    if (
      !product ||
      !user ||
      !product.product_date ||
      !product.product_date.length
    ) {
      alert("Faltan datos del producto o del usuario para realizar la reserva");
      return;
    }

    const slotsValue = parseInt(slotsRequested, 10);
    const dateData = getDateData(date);

    if (!dateData || !dateData.date_id) {
      alert("No se encontró información para la fecha seleccionada.");
      return;
    }

    const reservationData = {
      user_id: state.user.id,
      product_id: parseInt(product.id),
      date_id: dateData.date_id,
      slots_requested: slotsValue,
    };

    console.log("Producto en el modal:", product);
    console.log("Usuario en el modal:", user);
    console.log("Datos de la reserva:", reservationData);

    addReservation(reservationData);
    handleClose();
    alert("Reserva confirmada con exito");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={`https://fly-mountain-app.s3.us-east-2.amazonaws.com/${product.imageKey}`}
          alt={product.category.name}
          className={styles.img}
        />
        <h5>Producto a reservar: {product.name}</h5>
        <p>Descripción: {product.description}</p>
        <p>
          Locación:{" "}
          {product.product_location.map((loc) => loc.location.name).join(", ")}
        </p>
        <p>Precio: ${product.price}</p>
        <p>
          Fecha: {date ? date.toLocaleDateString() : "No seleccionada"} a las{" "}
          {time ? time : "hora no disponible"}
        </p>
        <h5>Usuario que realiza la reserva:</h5>
        <p>
          Nombre: {state.user.name} {state.user.lastname}
        </p>
        <p>Email: {state.user.email}</p>
        <label>Slots que deseas reservar:</label>
        <input
          type="number"
          min="1"
          value={slotsRequested}
          onChange={handleSlotChange}
        />
        <p>Slots disponibles: {availableSlots}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleConfirmReservation}>
          Confirmar Reserva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReservationModal;
