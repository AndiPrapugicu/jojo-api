import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import characterImages from "../images/characterImages ";
import "./CharacterDetails.css";

const CharacterDetail = () => {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(
          `https://stand-by-me.herokuapp.com/api/v1/characters/${id}`
        );
        const character = response.data;
        setCharacterDetails(character);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (!characterDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="character-details"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <img
        src={characterImages[characterDetails.name]}
        alt={characterDetails.name}
        style={{
          width: "350px",
          height: "auto",
          margin: "0 30px",
          borderRadius: "15px",
          border: "1px solid #f31559",
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
        className="details"
      >
        <h1>{characterDetails.name}&apos;s Info</h1>
        <p>Name: {characterDetails.name}</p>
        <p>Japanese Name: {characterDetails.japaneseName}</p>
        <p>Nationality: {characterDetails.nationality}</p>
        <p>Abilities: {characterDetails.abilities}</p>
        <p>Catchphrase: {characterDetails.catchphrase}</p>
        <p>Family: {characterDetails.family}</p>
        <p>Chapter: {characterDetails.chapter}</p>
      </div>
    </div>
  );
};

export default CharacterDetail;
