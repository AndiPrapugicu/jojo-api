import "./Filter.css";
import { useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import PropTypes from "prop-types";

function StandFilter({ onSort }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleFilterClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleAlphabeticalSort = () => {
    onSort("alphabetical");
    setIsDropdownVisible(false);
  };

  const handleFilterByStandUser = () => {
    onSort("standUser");
    setIsDropdownVisible(false);
  };

  return (
    <div className="filter">
      <div className="filter-button-container">
        <button className="filter-button" onClick={handleFilterClick}>
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
              onClick={handleFilterByStandUser}
            >
              Stand User
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

StandFilter.propTypes = {
  onSort: PropTypes.func.isRequired,
};

export default StandFilter;
