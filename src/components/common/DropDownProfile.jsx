import React, { useState } from "react";
import styles from "../../styles/DropDownProfile.module.css";
import { Link } from "react-router-dom";
import { useContextGlobal } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, HEADER_TOKEN } from "../../utils/appConstants";

const DropDownProfile = () => {
  const { state, dispatch } = useContextGlobal();
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const handleLogout = () => {
    axios
      .get(`${API_BASE_URL}:3000/api/logout`, {
        withCredentials: true,
        headers: HEADER_TOKEN,
      })
      .then(() => {
        console.log("Logout exitoso en el server.");
        dispatch({
          type: "logout",
        });
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
    alert("Has cerrado sesión exitosamente.");
    console.log(
      "Usuario eliminado de localStorage:",
      localStorage.getItem("user")
    );
    navigate("/");
  };

  const handleHiddeProfile = () => {
    dispatch({ type: "hiddeDropDownMenu" });
  };
  const handleMouseEnter = () => {
    setIsMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setIsMenuVisible(false);
  };
  const user = state.user || {};
  console.log(user);
  return (
    <div
      className={styles.dropDownMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: isMenuVisible ? "block" : "none" }}
    >
      <div className={styles.dropDownUserData}>
        <span className={styles.userName}>
          {user.name || ""} {user.lastname || ""}
        </span>
        <span className={styles.userEmail}>{user.email || ""} </span>
      </div>
      <hr />
      <div className={styles.dropDownMenuLink}>
        <Link to="/userProfile">
          <button onClick={handleHiddeProfile}>Mi perfil</button>
        </Link>
        <button onClick={handleHiddeProfile}>Cambiar contraseña</button>
      </div>
      <hr />
      <div className={styles.dropDownMenuLogout}>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default DropDownProfile;
