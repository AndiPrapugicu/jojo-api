import { useState } from "react";
import { BsList } from "react-icons/bs";
import "./Dropdown.css";
import { MdOutlineColorLens, MdOutlineSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Dropdown({ selectedThemeName }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="dropdown">
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
        <Link to="/themes" className="dropdown-item themes-link">
          <span>
            <MdOutlineColorLens />
            Themes
          </span>
        </Link>
        <Link to="/settings" className="dropdown-item themes-link">
          <span>
            <MdOutlineSettings />
            Settings
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
