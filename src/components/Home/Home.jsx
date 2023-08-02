import starplatinum from "./starplatinum.png";
import { Link } from "react-router-dom";
import jotaro from "./jotaro.png";
import { useState } from "react";
import "./Home.css";
import PropTypes from "prop-types";

function Home({ selectedThemeName }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageHover = () => {
    setIsHovered(true);
  };
  console.log("da este", handleImageHover);

  const handleImageLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`home ${selectedThemeName.toLowerCase()}-theme-color`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: isHovered
          ? "#2A2A2A"
          : selectedThemeName.toLowerCase() === "default"
          ? "#fff"
          : `var(--${selectedThemeName.toLowerCase()}-theme-color)`,
        transition: "background-color 0.3s ease",
      }}
    >
      {" "}
      <h1 style={{ textAlign: "center" }}>Select</h1>
      <div className="home-select">
        <Link to="/characters">
          <img
            src={jotaro}
            alt="Jotaro Kujo"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            className={`character-image ${selectedThemeName.toLowerCase()}-theme`}
          />
        </Link>
        <Link to="/stands">
          <img
            src={starplatinum}
            alt="Star Platinum"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            className={`stand-image ${selectedThemeName.toLowerCase()}-theme`}
          />
        </Link>
      </div>
    </div>
  );
}

Home.propTypes = {
  selectedThemeName: PropTypes.string,
};

export default Home;
