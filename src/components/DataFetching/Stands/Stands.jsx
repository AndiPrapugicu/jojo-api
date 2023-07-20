import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Stands.css";
import standImages from "../images/standImages";

const Stands = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [standsPerPage] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stand-by-me.herokuapp.com/api/v1/stands"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastStand = currentPage * standsPerPage;
  const indexOfFirstStand = indexOfLastStand - standsPerPage;
  const currentStands = data.slice(indexOfFirstStand, indexOfLastStand);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="stands" style={{ margin: "0 auto", width: "50%" }}>
      <h1>Stands List</h1>
      <ul>
        {currentStands.map((stand) => (
          <li key={stand.id} className="stands-data">
            <p>Name: {stand.name}</p>
            <Link to={`/stands/${stand.id}`}>
              <img
                src={standImages[stand.name]}
                alt={stand.name}
                style={{
                  width: "100px",
                  height: "auto",
                  borderRadius: "25px",
                  border: "2px solid white",
                  transition: "border-color 0.3s ease",
                }}
                className="stand-image"
              />
            </Link>
            <p>Chapter: {stand.chapter}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <div className="button-container">
          <button
            onClick={previousPage}
            disabled={currentPage === 1}
            className="stand-previous-button"
          >
            Previous
          </button>
        </div>
        <span className="page-text">Page {currentPage}</span>
        <div className="button-container">
          <button
            onClick={nextPage}
            disabled={indexOfLastStand >= data.length}
            className="stand-next-button"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stands;
