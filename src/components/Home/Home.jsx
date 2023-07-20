import starplatinum from "./starplatinum.png";
import { Link } from "react-router-dom";
import jotaro from "./jotaro.png";
import { useState } from "react";
import "./Home.css";

function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageHover = () => {
    setIsHovered(true);
  };

  const handleImageLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="home"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: isHovered ? "#2A2A2A" : "#f5f5f5",
        transition: "background-color 0.3s ease",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Select</h1>
      <div className="home-select">
        <Link to="/characters">
          <img
            src={jotaro}
            alt="Jotaro Kujo"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            className="character-image"
          />
        </Link>
        <Link to="/stands">
          <img
            src={starplatinum}
            alt="Star Platinum"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            className="stand-image"
          />
        </Link>
      </div>
    </div>
  );
}

export default Home;
