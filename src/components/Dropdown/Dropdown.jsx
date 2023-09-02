import { useState, useEffect, useRef } from "react";
import { BsList } from "react-icons/bs";
import "./Dropdown.css";
import {
  MdOutlineColorLens,
  MdOutlineSettings,
  MdOutlineLogin,
  MdOutlineLogout,
} from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LoginButton from "../Login/LoginButton";
import LogoutButton from "../Login/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

function Dropdown({ selectedThemeName }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { isAuthenticated } = useAuth0();

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropdownVisible]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div
        className={`icon ${selectedThemeName.toLowerCase()}-theme`}
        onClick={toggleDropdown}
        style={{ fontSize: "24px" }}
      >
        <BsList />
      </div>
      <div
        className={`dropdown-content ${
          dropdownVisible ? "show-dropdown" : ""
        } ${selectedThemeName.toLowerCase()}-theme`}
      >
        <Link
          to="/themes"
          className={`dropdown-item themes-link ${selectedThemeName.toLowerCase()}-theme`}
        >
          <span>
            <MdOutlineColorLens />
            Themes
          </span>
        </Link>
        <Link
          to="/settings"
          className={`dropdown-item themes-link ${selectedThemeName.toLowerCase()}-theme`}
        >
          <span>
            <MdOutlineSettings />
            Settings
          </span>
        </Link>
        <Link
          to="/login"
          className={`dropdown-item themes-link ${selectedThemeName.toLowerCase()}-theme`}
        >
          <span>
            {isAuthenticated ? <MdOutlineLogout /> : <MdOutlineLogin />}
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </span>
        </Link>
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  selectedThemeName: PropTypes.string,
};

export default Dropdown;
