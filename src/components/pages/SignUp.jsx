import { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import styles from "../../styles/LoginForm.module.css";

const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    /**llamar API */
  };

  const updateState = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
    console.log(userData);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <h3>Registrate</h3>
        <p>Ingresa tus datos para asignarte un usuario</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group>
              <Form.Control
                className={styles.inputField}
                required
                type="text"
                placeholder="Nombre*"
                value={userData.name}
                onChange={updateState}
                name="name"
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un nombre valido.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                className={styles.inputField}
                required
                type="text"
                placeholder="Apellido*"
                value={userData.lastName}
                onChange={updateState}
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un apellido valido.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                className={styles.inputField}
                type="email"
                onChange={updateState}
                placeholder="Correo electrónico*"
                required
                value={userData.email}
                name="email"
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un correo valido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Control
                className={styles.inputField}
                type="password"
                placeholder="Contraseña*"
                required
                value={userData.password}
                onChange={updateState}
                name="password"
              />
              <Form.Control.Feedback type="invalid">
                Contraseña insegura.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                className={styles.inputField}
                type="password"
                placeholder="Confirmar contraseña*"
                required
                value={userData.confirmPassword}
                onChange={updateState}
                name="confirmPassword"
              />
              <Form.Control.Feedback type="invalid">
                Las contraseñas no coinciden.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button className={styles.button} type="submit">
            Registrar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
