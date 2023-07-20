import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Characters.css";
import characterImages from "../images/characterImages ";

const Characters = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(15);

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

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = data.slice(
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
      className="characters"
      style={{ margin: "0 auto", width: "50%", fontFamily: "Arial" }}
    >
      <h1>Character List</h1>
      <ul>
        {currentCharacters.map((character) => (
          <li key={character.id} className="characters-data">
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
            className="previous-button"
          >
            Previous
          </button>
        </div>
        <span className="page-text">Page {currentPage}</span>
        <button
          className="next-button"
          onClick={nextPage}
          disabled={indexOfLastCharacter >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Characters;
