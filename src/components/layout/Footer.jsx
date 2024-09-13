import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../../styles/Footer.module.css";
function Footer() {
  const logoUrl =
    "https://fly-mountain-app.s3.us-east-2.amazonaws.com/images/logo.jpg";
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerSection1}>
        <img className={styles.img} src={logoUrl} alt="logo" />
        <ul className={styles.routes}>
          <li>
            <a href="/">HOME</a>
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
        <ul className={styles.socialMedia}>
          <li>
                        <a
                            href="https://www.instagram.com/punto.equilibrio.slackline/"
                            target="_blank"
                            rel="noopener noreferrer"
                        > 
                            <i className="bi bi-instagram"></i>
                        </a>
          </li>
          <li>
                        <a> 
                            <i className="bi bi-twitter"></i>
                        </a>
          </li>
          <li>
                        <a> 
                            <i className="bi bi-facebook"></i>
                        </a>
          </li>
        </ul>
      </div>
      <p className={styles.rights}>
        Copyright 2024 All Rights Reserved | Designed by
        <a href="">
          <b>punto.equilibrio.slackline</b>
        </a>
      </p>
    </footer>
  );
}

export default Footer;
