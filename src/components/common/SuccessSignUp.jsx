import { Modal } from "react-bootstrap";
import styles from "../../styles/SuccessSignUp.module.css";
import { Link } from "react-router-dom";
const SuccessSignUp = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={() => props.setShow(false)}
      //   centered
      dialogClassName="modal-80w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header className={styles.successSignUpHeader}>
        <i className="bi bi-check-circle-fill"></i>
      </Modal.Header>
      <Modal.Body className={styles.successSignUpBody}>
        <p>
          ¡Todo listo! Tu cuenta ha sido creada exitosamente. Gracias por unirte
          a nuestra comunidad. No dudes en comenzar a explorar y descubrir todo
          lo que tenemos para ofrecerte.
        </p>
        <Link to="/login">Iniciar sesión</Link>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessSignUp;
