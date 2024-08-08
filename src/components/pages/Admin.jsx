import React from "react";

const Admin = () => {
  if (screen.width < 500) {
    alert(
      "No se puede acceder a la vista administración desde un dispositivo móvil"
    );
    location.href = "/";
  }
  return <div>Vista principal de admnistración</div>;
};

export default Admin;
