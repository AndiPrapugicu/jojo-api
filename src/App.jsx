import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Stands from "./components/DataFetching/Stands/Stands";
import Characters from "./components/DataFetching/Characters/Characters";
import CharacterDetails from "./components/DataFetching/Characters/CharacterDetails";
import Home from "./components/Home/Home";
import StandDetails from "./components/DataFetching/Stands/StandDetails";

function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://stand-by-me.herokuapp.com/api/v1/characters"
        );
        setResults(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <Navbar results={results} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stands" element={<Stands />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="/stands/:id" element={<StandDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
