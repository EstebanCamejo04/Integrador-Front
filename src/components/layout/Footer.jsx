import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/Footer.css";
import logo from "/images/logo.jpg";
function Footer() {
  return (
    <footer>
      <div className="footer-section-1">
        <img src={logo} alt="logo" />
        <ul className="routes">
          <li>
            <a href="/home">HOME</a>
          </li>
          <li>
            <a href="/about-us">ABOUT</a>
          </li>
          <li>
            <a href="/contact-us">SERVICES</a>
          </li>
          <li>
            <a href="/contact-us">BLOG</a>
          </li>
          <li>
            <a href="/contact-us">CONTACT</a>
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
      </div>
      <p>
        Copyright 2024 All Rights Reserved | Designed by
        <a href="">
          <b>punto.equilibrio.slackline</b>
        </a>
      </p>
    </footer>
  );
}

export default Footer;
