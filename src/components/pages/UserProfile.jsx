import React from "react";
import styles from "../../styles/UserProfile.module.css";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useContextGlobal } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
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
  const user = state.user ? state.user : null;
  console.log(user);
  return (
    <div className={styles.profileContainer}>
      <Card className={styles.profileCard}>
        <Card.Header className={styles.profileHeader}>
          Perfil del usuario
        </Card.Header>

        <ListGroup horizontal className={styles.profileLabel}>
          <ListGroup.Item className={styles.infoTitle}>Nombre</ListGroup.Item>
          <ListGroup.Item className={styles.infoValue}>
            {user.name || ""}
          </ListGroup.Item>
        </ListGroup>

        <ListGroup horizontal>
          <ListGroup.Item className={styles.infoTitle}>Apellido</ListGroup.Item>
          <ListGroup.Item className={styles.infoValue}>
            {user.lastname || ""}
          </ListGroup.Item>
        </ListGroup>

        <ListGroup horizontal>
          <ListGroup.Item className={styles.infoTitle}>Email</ListGroup.Item>
          <ListGroup.Item className={styles.infoValue}>
            {user.email || ""}
          </ListGroup.Item>
        </ListGroup>

        <ListGroup horizontal>
          <ListGroup.Item className={styles.infoTitle}>Teléfono</ListGroup.Item>
          <ListGroup.Item className={styles.infoValue}>
            {user.phone || ""}
          </ListGroup.Item>
        </ListGroup>

        <ListGroup horizontal>
          <ListGroup.Item className={styles.infoTitle}>Rol</ListGroup.Item>
          <ListGroup.Item className={styles.infoValue}>
            {user.role.role || ""}
          </ListGroup.Item>
        </ListGroup>

        <ListGroup horizontal>
          <ListGroup.Item className={styles.infoTitle}>
            Fecha de registro
          </ListGroup.Item>
          <ListGroup.Item className={styles.infoValue}>
            {user.registrationDate || ""}
          </ListGroup.Item>
        </ListGroup>
        <Button
          variant="danger"
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          Cerrar Sesión
        </Button>
      </Card>
    </div>
  );
};

export default UserProfile;
