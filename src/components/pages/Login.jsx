import React, { useState, useEffect } from "react";
import styles from "../../styles/LoginForm.module.css";
import { useContextGlobal } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      .post("http://localhost:3000/api/login", loginData, {
        withCredentials: true,
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
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (password.length < 3) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    login({ email, password });
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [show, navigate]);

  return (
    <div className={styles.formContainer}>
      {!show && (
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

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      )}
      {show && (
        <h5 className={styles.success}>
          Bienvenido {email}, has iniciado sesión con éxito.
        </h5>
      )}
      {error && <h5 className={styles.error}>{error}</h5>}
    </div>
  );
};

export default Login;
