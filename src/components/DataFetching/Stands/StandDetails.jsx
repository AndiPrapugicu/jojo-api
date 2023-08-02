import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import standImages from "../images/standImages";
import "./StandDetails.css";
import PropTypes from "prop-types";

const StandDetails = ({ selectedThemeName }) => {
  const { id } = useParams();
  const [standDetails, setStandDetails] = useState(null);
  const [standUser, setStandUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const standResponse = await axios.get(
          `https://stand-by-me.herokuapp.com/api/v1/stands/${id}`
        );
        const stand = standResponse.data;
        setStandDetails(stand);

        if (stand.standUser) {
          const characterResponse = await axios.get(
            `https://stand-by-me.herokuapp.com/api/v1/characters/${stand.standUser}`
          );
          const character = characterResponse.data;
          setStandUser(character.name);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!standDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="stand-details"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <img
        src={standImages[standDetails.name]}
        alt={standDetails.name}
        className={`stand-img ${selectedThemeName.toLowerCase()}-theme`}
        style={{
          width: "350px",
          height: "auto",
          margin: "0 30px",
          borderRadius: "15px",
          // border: "1px solid #00ff00",
          boxShadow: "1px 1px 15px 1px",
          background: "white",
        }}
      />
      <div
        style={{
          textAlign: "center",
          fontFamily: "Arial",
          background: "white",
        }}
        className={`detail ${selectedThemeName.toLowerCase()}-theme`}
      >
        <h1>{standDetails.name}&apos;s Info</h1>
        <p>Name: {standDetails.name}</p>
        <p>Japanese Name: {standDetails.japaneseName}</p>
        <p>Alternate Name: {standDetails.alternateName}</p>
        {standUser ? (
          <p>Stand User: {standUser}</p>
        ) : (
          <p>Stand User: Not available</p>
        )}
        <p>Abilities: {standDetails.abilities}</p>
        <p>Battlecry: {standDetails.battlecry}</p>
        <p>Chapter: {standDetails.chapter}</p>
      </div>
    </div>
  );
};

StandDetails.propTypes = {
  selectedThemeName: PropTypes.string,
};

export default StandDetails;
