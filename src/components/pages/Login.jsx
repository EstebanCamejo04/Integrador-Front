import React, { useState, useEffect } from "react";
import styles from "../../styles/LoginForm.module.css";
import { useContextGlobal } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessLogin from "../common/SuccessLogin";
import { API_BASE_URL, HEADER_TOKEN } from "../../utils/appConstants";

const Login = () => {
  const { dispatch } = useContextGlobal();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const login = (loginData) => {
    axios
      .post(`${API_BASE_URL}:3000/api/login`, loginData, {
        withCredentials: true,
        headers: HEADER_TOKEN,
      })
      .then((response) => {
        dispatch({
          type: "login",
          payload: response.data,
        });
        setShow(true);
        console.log(
          `Usuario: ${response.data.user.name} ${response.data.user.lastname} ha iniciado sesión exitosamente.`
        );
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        if (error.response && error.response.status === 401) {
          setError(
            "Credenciales incorrectas. Por favor, verifica tu correo y contraseña."
          );
        } else {
          setError(
            "Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo."
          );
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    login({ email, password });
  };

  return (
    <div className={styles.formContainer}>
      {!show ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Correo Electronico*"
            required
            className={styles.inputField}
            value={email}
            onChange={(event) => setEmail(event.target.value.trim())}
          />

          <input
            type="password"
            placeholder="Contraseña*"
            required
            className={styles.inputField}
            value={password}
            onChange={(event) => setPassword(event.target.value.trim())}
          />

          <span>* Required field</span>
          {error && <h5 className={styles.error}>{error}</h5>}

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      ) : (
        <SuccessLogin show={show} setShow={setShow} />
      )}
    </div>
  );
};

export default Login;
