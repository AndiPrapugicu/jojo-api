import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchBar/SearchResults";
import Dropdown from "../Dropdown/Dropdown";
import PropTypes from "prop-types";

const Navbar = ({
  selectedThemeName,
  selectedThemeColor,
  handleThemeSelectClick,
}) => {
  console.log(selectedThemeName);
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  return (
    <div
      className={`nav ${selectedThemeColor?.toLowerCase()}-theme`}
      style={{ backgroundColor: selectedThemeColor }}
    >
      <a className="autohublogo" href="/">
        <img
          src="./jojo.png"
          style={{ width: "200px", height: "75px" }}
          alt="logo"
        />
      </a>
      <div className="search">
        <SearchBar
          setResults={setResults}
          selectedThemeName={selectedThemeName}
        />
        <SearchResults results={results} />
      </div>
      <div className="buttons">
        <button
          className={`characters-button ${selectedThemeName.toLowerCase()}-theme-button`}
          onClick={() => {
            navigate("/characters");
          }}
        >
          Characters
        </button>
        <button
          className={`stands-button ${selectedThemeName.toLowerCase()}-theme-button`}
          onClick={() => {
            navigate("/stands");
          }}
        >
          Stands
        </button>
        <Dropdown
          handleThemeSelectClick={(themeName, themeColor) => {
            handleThemeSelectClick(themeName, themeColor);
          }}
          selectedThemeName={selectedThemeName}
        />
      </div>
    </div>
  );
};

Navbar.propTypes = {
  selectedThemeColor: PropTypes.string.isRequired,
  selectedThemeName: PropTypes.string,
  handleThemeSelectClick: PropTypes.func.isRequired,
};

export default Navbar;
