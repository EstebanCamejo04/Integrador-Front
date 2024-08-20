import React, { useEffect, useState } from "react";
import logo from "/images/logo2.jpg";
import styles from "../../styles/Navbar.module.css";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContextGlobal } from "../../context/Context";
import DropDownProfile from "../common/DropDownProfile";
import axios from "axios";

const Navbar = () => {
  const width = 850;
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= width);
  const { state, dispatch } = useContextGlobal();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    dispatch({ type: "logout" });
    alert("Has cerrado sesión exitosamente.");
    console.log(
      "Usuario eliminado de localStorage:",
      localStorage.getItem("user")
    );
    handleClose();
    navigate("/");
  };

  const handleOpenProfile = () => {
    dispatch({ type: "toggleDropDownMenu" });
  };

  const handleResize = () => {
    if (window.innerWidth <= width) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const initials = state.user
    ? state.user.name[0].toUpperCase() + state.user.lastname[0].toUpperCase()
    : "";

  const role = state.user ? state.user.role_id : 0;

  return isMobile ? (
    <>
      <Offcanvas show={show} onHide={handleClose} className={styles.leftMenu}>
        <Offcanvas.Header>
          <button
            type="button"
            className={"btn-close btn-close-white"}
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Offcanvas.Header>
        <Offcanvas.Title>
          <Link to="/" onClick={handleClose} className={styles.avoidLinkStyles}>
            <div className={styles.leftHeaderMenu}>
              <img src={logo} alt="homeLogo" />
              <p>Fly Mountain</p>
            </div>
          </Link>
        </Offcanvas.Title>
        <Offcanvas.Body className={styles.leftMenuBody}>
          {role ? (
            <div>
              <ul>
                {/* <li>
                  <Link to="/admin" onClick={handleClose}>
                    <i className="bi bi-gear-fill"></i>
                    <span>Administrador</span>
                  </Link>
                </li> */}
                <li>
                  <Link to="/userProfile" onClick={handleClose}>
                    <i class="bi bi-person-circle"></i>
                    <span>Mi perfil</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClose}>
                    <i class="bi bi-asterisk"></i>
                    <span>Cambiar contraseña</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>
                    <i class="bi bi-box-arrow-left"></i>
                    <span>Cerrar sesión</span>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className={styles.leftMenuFooter}>
              <Link
                to="/login"
                className={styles.orangeButton}
                onClick={handleClose}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/sign-up"
                className={styles.orangeButton}
                onClick={handleClose}
              >
                Crear cuenta
              </Link>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      <nav className={styles.navBar + " " + styles.mobileHeader}>
        <div>
          <Link onClick={handleShow}>
            <i className="bi bi-list"></i>
          </Link>
        </div>
        <Link to="/" className={styles.avoidLinkStyles}>
          <div className={styles.logoDiv}>
            <img src={logo} alt="homeLogo" />
            <p>Fly Mountain</p>
          </div>
        </Link>
      </nav>
    </>
  ) : (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.avoidLinkStyles}>
        <div className={styles.logoDiv}>
          <img src={logo} alt="homeLogo" />
          <p>Fly Mountain</p>
        </div>
      </Link>
      {state.validAdmin && (
        <div>
          <Link to="/admin">Administrador</Link>
        </div>
      )}

      {state.openProfile && <DropDownProfile />}

      <div>
        {state.validAdmin || state.validUser ? (
          <div className={styles.avatar} onClick={handleOpenProfile}>
            {initials}
          </div>
        ) : (
          <>
            <Link to="/login" className={styles.orangeButton}>
              Iniciar sesión
            </Link>
            <Link to="/sign-up" className={styles.orangeButton}>
              Crear cuenta
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
