import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleBackClick} style={styles.button}>
      <img
        src="https://fly-mountain-app.s3.us-east-2.amazonaws.com/images/back_arrow_icon.svg"
        alt="Volver"
        style={styles.icon}
      />
      Regresar
    </button>
  );
};

const styles = {
  button: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "10px",
  },
  icon: {
    width: "24px",
    height: "24px",
  },
};

export default BackButton;
