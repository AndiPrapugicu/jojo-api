import "./Filter.css";
import { useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import PropTypes from "prop-types";

function Filter({ onSort, selectedThemeName }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleFilterClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleAlphabeticalSort = () => {
    onSort("alphabetical");
    setIsDropdownVisible(false);
  };

  const handleFilterByChapter = () => {
    onSort("chapter");
    setIsDropdownVisible(false);
  };

  return (
    <div className="filter">
      <div className="filter-button-container">
        <button
          className={`filter-button ${selectedThemeName.toLowerCase()}-theme`}
          onClick={handleFilterClick}
        >
          <AiOutlineUnorderedList />
          Filter
        </button>
        {isDropdownVisible && (
          <div className="filter-dropdown">
            <button
              className="filter-dropdown-button"
              onClick={handleAlphabeticalSort}
            >
              Alphabetical Order
            </button>
            <button
              className="filter-dropdown-button"
              onClick={handleFilterByChapter}
            >
              Chapter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

Filter.propTypes = {
  onSort: PropTypes.func.isRequired,
  onFilterByChapter: PropTypes.func.isRequired,
  selectedThemeName: PropTypes.string,
};

export default Filter;
