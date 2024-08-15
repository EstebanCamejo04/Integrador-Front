import React from "react";
import styles from "../../styles/DropDownProfile.module.css";
import { Link } from "react-router-dom";
import { useContextGlobal } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const DropDownProfile = () => {
  const { state, dispatch } = useContextGlobal();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "logout" });
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
  const user = state.user || {};
  console.log(user);
  return (
    <div
    className={styles.dropDownMenu}>
      <div className={styles.dropDownUserData}>
        <span className={styles.userName}>
          {user.firstName || ""} {user.lastName || ""}
        </span>
        <span className={styles.userEmail}>{user.email || ""}</span>
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
