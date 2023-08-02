import "./SearchBar.css";
// import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import PropTypes from "prop-types";

function SearchBar({ setResults, selectedThemeName }) {
  const [input, setInput] = useState("");
  const fetchData = (value) => {
    fetch("https://stand-by-me.herokuapp.com/api/v1/characters")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((character) => {
          return (
            value &&
            character &&
            character.name &&
            character.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div>
      <div
        className={`search-bar ${selectedThemeName.toLowerCase()}-theme-color`}
      >
        {/* <FaSearch id="search-icon" /> */}
        <input
          type="text"
          placeholder="ex: Jonathan Joestar"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          className={`input ${selectedThemeName.toLowerCase()}-theme-color`}
        />
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  setResults: PropTypes.func.isRequired,
  selectedThemeName: PropTypes.string,
};

export default SearchBar;
