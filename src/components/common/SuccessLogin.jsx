import { Modal } from "react-bootstrap";
import styles from "../../styles/SuccessLogin.module.css";
import { Link } from "react-router-dom";

const SuccessLogin = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="modal-80w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header className={styles.successLoginHeader}>
        <i className="bi bi-check-circle-fill"></i>
      </Modal.Header>
      <Modal.Body className={styles.successLoginBody}>
        <p>
          ¡Bienvenido de nuevo! Has iniciado sesión exitosamente. Ahora puedes
          explorar todas las funciones disponibles y continuar donde lo dejaste.
        </p>
        <Link to="/">Ir al inicio</Link>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessLogin;
