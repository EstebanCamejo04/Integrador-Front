import { Modal } from "react-bootstrap";
import styles from "../../styles/SuccessSignUp.module.css";
import { Link } from "react-router-dom";

const SuccessCreateProduct = ({ show, setShow }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      //   centered
      dialogClassName="modal-80w"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header className={styles.successSignUpHeader}>
        <i className="bi bi-check-circle-fill"></i>
      </Modal.Header>
      <Modal.Body className={styles.successSignUpBody}>
        <p>
          ¡Todo listo! Tu producto ha sido creado y registrado en el sistema de
          forma exitosa. Ahora puedes administrarlo desde el panel para editarlo
          o incluso borrarlo de ser necesario.
        </p>
        <Link to="/admin/products">Ver lista de productos</Link>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessCreateProduct;
