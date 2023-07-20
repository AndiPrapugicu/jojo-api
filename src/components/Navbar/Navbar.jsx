import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchBar/SearchResults";
import PropTypes from "prop-types";

function Navbar() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  return (
    <div className="navbar">
      <div className="nav">
        <a className="autohublogo" href="/">
          <img src="./jojo.png" style={{ width: "200px", height: "75px" }} />
        </a>
        <div className="search">
          <SearchBar setResults={setResults} />
          <SearchResults results={results} />
        </div>
        <div className="buttons">
          <button
            className="characters-button"
            onClick={() => {
              navigate("/characters");
            }}
          >
            Characters
          </button>
          <button
            className="stands-button"
            onClick={() => {
              navigate("/stands");
            }}
          >
            Stands
          </button>
        </div>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  results: PropTypes.array.isRequired,
};

export default Navbar;
