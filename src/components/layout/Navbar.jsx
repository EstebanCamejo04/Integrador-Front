import React from "react";
import logo from "/images/logo2.jpg";
import styles from "../../styles/Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.avoidLinkStyles}>
        <div className={styles.logoDiv}>
          <img src={logo} alt="homeLogo" />
          <p>Fly Mountain</p>
        </div>
      </Link>
      <div>
        <Link to="/admin">Administrador</Link>
      </div>
      <div>
        <button>Iniciar Sesion</button>
        <button>Crea una Cuenta</button>
      </div>
    </nav>
  );
};

export default Navbar;
