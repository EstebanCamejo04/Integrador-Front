import React from "react";
import styles from "../../styles/Admin.module.css"

const Admin = () => {
  if (screen.width < 500) {
    alert(
      "No se puede acceder a la vista administración desde un dispositivo móvil"
    );
    location.href = "/";
  }
  return <div className={styles.Admin}>Administre su aplicacion desde aqui</div>;
};

export default Admin;
