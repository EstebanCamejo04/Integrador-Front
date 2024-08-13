import React from "react";
import styles from "../../styles/UserProfile.module.css";
import { Card, ListGroup } from "react-bootstrap";

const UserProfile = () => {
  return (
    <div className={styles.profileContainer}>
      <Card className={styles.profileCard}>
        <Card.Header className={styles.profileHeader}>
          Perfil del usuario
        </Card.Header>

        <ListGroup horizontal className={styles.profileLabel}>
          <ListGroup.Item className={styles.infoTitle}>Nombre</ListGroup.Item>
          <ListGroup.Item className={styles.infoValue}>{"Juan"}</ListGroup.Item>
        </ListGroup>

        <ListGroup horizontal>
          <ListGroup.Item className={styles.infoTitle}>Apellido</ListGroup.Item>
          <ListGroup.Item className={styles.infoValue}>
            {"Perez"}
          </ListGroup.Item>
        </ListGroup>

        <ListGroup horizontal>
          <ListGroup.Item className={styles.infoTitle}>Email</ListGroup.Item>
          <ListGroup.Item className={styles.infoValue}>
            {"juanperez@gmail.com"}
          </ListGroup.Item>
        </ListGroup>

        <ListGroup horizontal>
          <ListGroup.Item className={styles.infoTitle}>Teléfono</ListGroup.Item>
          <ListGroup.Item className={styles.infoValue}>
            {"1234-5678"}
          </ListGroup.Item>
        </ListGroup>

        <ListGroup horizontal>
          <ListGroup.Item className={styles.infoTitle}>Rol</ListGroup.Item>
          <ListGroup.Item className={styles.infoValue}>
            {"Admin"}
          </ListGroup.Item>
        </ListGroup>

        <ListGroup horizontal>
          <ListGroup.Item className={styles.infoTitle}>
            Fecha de registro
          </ListGroup.Item>
          <ListGroup.Item className={styles.infoValue}>
            {"13/08/2024"}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default UserProfile;
