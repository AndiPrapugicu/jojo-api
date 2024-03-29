import "./Footer.css";
import { FaInstagram, FaGithub } from "react-icons/fa";
import PropTypes from "prop-types";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-text">
          <p>You can find me on my social media accounts:</p>
        </div>
        <div className="social-icons">
          <a
            href="https://www.instagram.com/itsmeandiraul/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="icon" />
          </a>
          <a
            href="https://github.com/AndiPrapugicu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  selectedThemeColor: PropTypes.string.isRequired,
};

export default Footer;
