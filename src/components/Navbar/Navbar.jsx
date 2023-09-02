import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchBar/SearchResults";
import Dropdown from "../Dropdown/Dropdown";
import PropTypes from "prop-types";
import useHighlightColor from "../../utils/useHighlightColor";

const Navbar = ({
  selectedThemeName,
  handleThemeSelectClick,
  navbarColor,
  setNavbarColor,
  selectedButtonTheme,
}) => {
  console.log(selectedThemeName);
  const highlightColor = useHighlightColor();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  return (
    <div className={`nav ${navbarColor?.toLowerCase()}-theme`}>
      <a className="jojologo" href="/">
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
          className={`characters-button ${highlightColor}-theme-button`}
          onClick={() => {
            navigate("/characters");
          }}
        >
          Characters
        </button>
        <button
          className={`stands-button ${highlightColor}-theme-button`}
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
          setNavbarColor={setNavbarColor}
          navbarColor={navbarColor}
          selectedButtonTheme={selectedButtonTheme}
        />
      </div>
    </div>
  );
};

Navbar.propTypes = {
  selectedThemeColor: PropTypes.string.isRequired,
  selectedThemeName: PropTypes.string,
  handleThemeSelectClick: PropTypes.func.isRequired,
  navbarColor: PropTypes.string.isRequired,
  setNavbarColor: PropTypes.func.isRequired,
  selectedButtonTheme: PropTypes.string,
};

export default Navbar;
