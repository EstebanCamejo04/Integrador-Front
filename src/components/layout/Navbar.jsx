import React, { useEffect, useState } from "react";
import logo from "/images/logo2.jpg";
import styles from "../../styles/Navbar.module.css";
import { Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContextGlobal } from "../../context/Context";

const Navbar = () => {
  const width = 850;
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= width);
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();
  const { state } = useContextGlobal();

  const changeRoleToAdmin = () => {
    setRole("admin");
    navigate("/");
  };
  const changeRoleToUser = () => {
    setRole("user");
    navigate("/");
  };
  const changeRoleToAnonym = () => {
    setRole("anonym");
    navigate("/");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  const user = state.user || {};
  const isAuthenticated = !!user.firstName;
  const initials =
    (user.firstName ? user.firstName[0] : "") +
    (user.lastName ? user.lastName[0] : "");

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
          <div>
            <ul>
              <li>
                <Link to="/admin" onClick={handleClose}>
                  <i className="bi bi-gear-fill"></i>
                  <span>Administrador</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.leftMenuFooter}>
            <Link to="/login" onClick={handleClose}>
              <button>Iniciar sesión</button>
            </Link>
            <button onClick={handleClose}>Crear cuenta</button>
          </div>
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
      <div>
        <Link to="/admin">Administrador</Link>
      </div>

      {isAuthenticated && (
        <Link to="/userProfile">
          <div className={styles.avatar}>{initials || ""}</div>
        </Link>
      )}
      {!isAuthenticated && (
        <div>
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
          <button>Crear cuenta</button>
        </div>
      )}

      {/* {role === "admin" && (
        <div>
          <Link to="/admin">Administrador</Link>
        </div>
      )}
      <div>
        {role !== "admin" && <button onClick={changeRoleToAdmin}>Admin</button>}
        {role !== "user" && (
          <button onClick={changeRoleToUser}>Usuario registrado</button>
        )}
        {role !== "anonym" && (
          <button onClick={changeRoleToAnonym}>Usuario no registrado</button>
        )}
      </div>
      <div>
        {role !== "anonym" && (
          <Link to="/userProfile">
            <div className={styles.avatar}>{initials}</div>
          </Link>
        )}
        {role === "anonym" && (
          <>
            <Link to="/login">
              <button>Iniciar sesión</button>
            </Link>
            <button>Crear cuenta</button>
          </>
        )}
      </div> */}
    </nav>
  );
};

export default Navbar;
