import React, { useState, useEffect } from "react";
import styles from "../../styles/LoginForm.module.css";
import { useContextGlobal } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const { dispatch } = useContextGlobal();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!validateEmail(user.username)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (user.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    const loggedInUser = {
      username: user.username,
      firstName: "Pepito",
      lastName: "Ramirez",
      email: user.username,
      phone: "88888888",
      role: "admin",
      registrationDate: "14/08/2024",
    };
    dispatch({ type: "setUser", payload: loggedInUser });
    setShow(true);
    console.log(`Usuario: ${user.username} ha iniciado sesión exitosamente.`);
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
            value={user.username}
            onChange={(event) =>
              setUser({ ...user, username: event.target.value.trim() })
            }
          />

          <input
            type="password"
            placeholder="Contraseña*"
            required
            className={styles.inputField}
            value={user.password}
            onChange={(event) =>
              setUser({ ...user, password: event.target.value.trim() })
            }
          />

          <span>* Required field</span>

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      )}
      {show && (
        <h5 className={styles.success}>
          Bienvenido {user.username}, has iniciado sesión con éxito.
        </h5>
      )}
      {error && <h5 className={styles.error}>{error}</h5>}
    </div>
  );
};

export default Login;
