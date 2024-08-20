import { useState } from "react";
import formStyles from "../../styles/LoginForm.module.css";
import styles from "../../styles/SignUp.module.css";
import axios from "axios";
import SuccessSignUp from "../common/SuccessSignUp";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const errors = {};
    if (!userData.name) errors.name = "El campo nombre es obligatorio";
    else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)*$/.test(userData.name)) {
      errors.name = "El nombre no puede incluir números ni símbolos";
    }
    if (!userData.lastName)
      errors.lastName = "El campo apellido es obligatorio";
    else if (!/^[a-zA-Z]+(\s[a-zA-Z]+)*$/.test(userData.lastName)) {
      errors.lastName = "El apellido no puede incluir números ni símbolos";
    }
    if (!userData.email) errors.email = "El correo electrónico es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(userData.email))
      errors.email = "El formato de correo electrónico es inválido";

    if (!userData.password) errors.password = "La contraseña es obligatoriia";
    else if (userData.password.length < 8) {
      errors.password = "Contraseña insegura";
    }
    if (!userData.phone) errors.phone = "El número de teléfono es obligatorio";
    else if (!/^[0-9]+$/.test(userData.phone))
      errors.phone = "El número de teléfono no debe incluir letras ni símbolos";
    else if (userData.phone.toString().length > 10)
      errors.phone = "El número de teléfono no debe exceder los 10 dígitos";
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
      .post("http://localhost:3000/api/sign-up", {
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          setShow(true);
        } else {
          setApiError(e.response.data.error);
        }
      })
      .catch((e) => {
        setApiError(e.response.data.error);
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
                type="text"
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
                type="text"
                name="phone"
                placeholder="Telefono*"
                value={userData.phone}
                onChange={updateState}
                className={
                  formStyles.inputField +
                  " " +
                  (errors.phone ? styles.inputError : "")
                }
              />
              {errors.phone && (
                <span className={styles.errorText}>{errors.phone}</span>
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
            <p className={styles.errorText}>{apiError}</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
