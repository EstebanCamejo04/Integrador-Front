import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.css";
import logo from "../assets/images/logo.jpg";
function Footer() {
  return (
    <footer>
      <img src={logo} alt="logo" />
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/about-us">About us</a>
        </li>
        <li>
          <a href="/contact-us">Contact us</a>
        </li>
      </ul>
      <ul>
        <li>
          <i className="bi bi-instagram"></i>
        </li>
        <li>
          <i className="bi bi-twitter"></i>
        </li>
        <li>
          <i className="bi bi-facebook"></i>
        </li>
      </ul>
      <p>
        Copyright 2024 All Rights Reserved | By{" "}
        <b>punto.equilibrio.slackline</b>
      </p>
    </footer>
  );
}

export default Footer;
