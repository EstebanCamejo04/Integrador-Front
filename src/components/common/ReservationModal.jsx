import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useContextGlobal } from "../../context/Context";
import styles from "../../styles/ReservationModal.module.css";

const ReservationModal = ({ show, handleClose, product, date, time }) => {
  const { state, addReservation } = useContextGlobal();

  const handleConfirmReservation = () => {
    const reservationData = {
      product,
      user: state.user,
      date,
      time,
    };

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
        <p>Locación:</p>
        <p>Precio: ${product.price}</p>
        <p>Fecha: {date}</p>
        <p>Hora: {time}</p>
        <h5>Usuario que realiza la reserva:</h5>
        <p>
          Nombre: {state.user.name} {state.user.lastname}
        </p>
        <p>Email: {state.user.email}</p>
        <p>Telefono: {state.user.phone}</p>
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
