import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Characters.css";
import characterImages from "../images/characterImages ";
import Filter from "../../Filter/Filter";
import PropTypes from "prop-types";

const Characters = ({ selectedThemeName }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(15);
  const [activeFilter, setActiveFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stand-by-me.herokuapp.com/api/v1/characters"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const sortCharacters = (method) => {
    const sortedData = [...data];

    if (method === "alphabetical") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (method === "chapter") {
      sortedData.sort((a, b) => a.chapter.localeCompare(b.chapter));
    }

    setData(sortedData);
    setCurrentPage(1);
  };

  const filterByChapter = (chapter) => {
    setActiveFilter(chapter);
    setCurrentPage(1);
  };

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

  const filteredCharacters = activeFilter
    ? data.filter((character) => character.chapter === activeFilter)
    : data;

  const currentCharacters = filteredCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div
      className={`characters ${selectedThemeName.toLowerCase()}-theme-color`}
      style={{ margin: "0 auto", width: "50%", fontFamily: "Arial" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Character List</h1>
        <Filter
          onSort={sortCharacters}
          onFilterByChapter={filterByChapter}
          selectedThemeName={selectedThemeName}
        />
      </div>
      <ul>
        {currentCharacters.map((character) => (
          <li
            key={character.id}
            className={`characters-data ${selectedThemeName.toLowerCase()}-theme`}
          >
            <p>Name: {character.name}</p>
            <p>
              {characterImages[character.name] && (
                <Link to={`/characters/${character.id}`}>
                  <img
                    src={characterImages[character.name]}
                    alt={character.name}
                    style={{
                      width: "100px",
                      height: "auto",
                      borderRadius: "25px",
                      border: "2px solid white",
                      transition: "border-color 0.3s ease",
                    }}
                    className="character-image"
                  />
                </Link>
              )}
            </p>
            <p>Chapter: {character.chapter}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <div className="button-container">
          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className={`previous-button ${selectedThemeName.toLowerCase()}-theme-button`}
          >
            Previous
          </button>
        </div>
        <span className="page-text">Page {currentPage}</span>
        <button
          className={`next-button ${selectedThemeName.toLowerCase()}-theme-button`}
          onClick={nextPage}
          disabled={indexOfLastCharacter >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

Characters.propTypes = {
  selectedThemeName: PropTypes.string,
};

export default Characters;
