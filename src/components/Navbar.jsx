import React from "react";
import logo from "/images/logo2.jpg";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navBar">
      <div className="logoDiv">
        <img src={logo} alt="homeLogo" />

        <p>Fly Mountain</p>
      </div>
      <div>
        <button>Iniciar Sesion</button>
        <button>Crea una Cuenta</button>
      </div>
    </nav>
  );
};

export default Navbar;
