import { useState } from "react";
import formStyles from "../../styles/LoginForm.module.css";
import styles from "../../styles/SignUp.module.css";
import axios from "axios";
import SuccessSignUp from "../common/SuccessSignUp";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const errors = {};
    if (!userData.name) errors.name = "Nombre requerido";
    if (!userData.lastName) errors.lastName = "Apellido requerido";
    if (!userData.email) errors.email = "Correo electrónico requerido";
    else if (!/\S+@\S+\.\S+/.test(userData.email))
      errors.email = "Correo electrónico inválido";
    if (!userData.password) errors.password = "Contraseña requerida";
    if (userData.password !== userData.confirmPassword)
      errors.confirmPassword = "Las contraseñas deben coincidir";
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      registerUser();
    }
  };

  const updateState = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const registerUser = () => {
    axios
      .post("http://demo6033406.mockable.io//sign-up", {
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      })
      .then((res) => {
        console.log(res.data);
        setShow(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <SuccessSignUp show={show} setShow={setShow} />
      <div className={formStyles.formContainer}>
        <div className={formStyles.form}>
          <h3>Regístrate</h3>
          <p>Ingresa tus datos para asignarte un usuario</p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Nombre*"
                value={userData.name}
                onChange={updateState}
                className={
                  formStyles.inputField +
                  " " +
                  (errors.name ? styles.inputError : "")
                }
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Apellido*"
                value={userData.lastName}
                onChange={updateState}
                className={
                  formStyles.inputField +
                  " " +
                  (errors.lastName ? styles.inputError : "")
                }
              />
              {errors.lastName && (
                <span className={styles.errorText}>{errors.lastName}</span>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico*"
                value={userData.email}
                onChange={updateState}
                className={
                  formStyles.inputField +
                  " " +
                  (errors.email ? styles.inputError : "")
                }
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={userData.password}
                placeholder="Contraseña"
                onChange={updateState}
                className={
                  formStyles.inputField +
                  " " +
                  (errors.password ? styles.inputError : "")
                }
              />
              {errors.password && (
                <span className={styles.errorText}>{errors.password}</span>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                placeholder="Confirmar contraseña"
                onChange={updateState}
                className={
                  formStyles.inputField +
                  " " +
                  (errors.confirmPassword ? styles.inputError : "")
                }
              />
              {errors.confirmPassword && (
                <span className={styles.errorText}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button type="submit" className={formStyles.button}>
              Registrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
