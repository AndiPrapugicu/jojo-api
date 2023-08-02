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
import Settings from "./components/Settings/Settings";
import Themes from "./components/Themes/Themes";

function App() {
  const initialThemeColor = localStorage.getItem("selectedThemeColor") || "";
  const initialThemeName =
    localStorage.getItem("selectedThemeName") || "Default";
  const [results, setResults] = useState([]);
  const [selectedThemeColor, setSelectedThemeColor] =
    useState(initialThemeColor);
  const [selectedThemeName, setSelectedThemeName] = useState(initialThemeName);

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

  const handleThemeSelectClick = (themeName, themeColor) => {
    setSelectedThemeName(themeName);
    setSelectedThemeColor(themeColor);
    localStorage.setItem("selectedThemeColor", themeColor);
    localStorage.setItem("selectedThemeName", themeName);
  };

  return (
    <BrowserRouter>
      <div
        className={`app ${selectedThemeName.toLowerCase()}-theme-color`}
        style={{ backgroundColor: `var(--app-background-color)` }}
      >
        <Navbar
          results={results}
          selectedThemeColor={selectedThemeColor}
          handleThemeSelectClick={handleThemeSelectClick}
          selectedThemeName={selectedThemeName}
        />
        <Routes>
          <Route
            path="/"
            selectedThemeColor={selectedThemeColor}
            element={<Home selectedThemeName={selectedThemeName} />}
          />
          <Route
            path="/stands"
            element={<Stands selectedThemeName={selectedThemeName} />}
          />
          <Route
            path="/characters"
            element={<Characters selectedThemeName={selectedThemeName} />}
          />
          <Route
            path="/characters/:id"
            element={<CharacterDetails selectedThemeName={selectedThemeName} />}
          />
          <Route
            path="/stands/:id"
            element={<StandDetails selectedThemeName={selectedThemeName} />}
          />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/themes"
            element={
              <Themes
                handleThemeSelectClick={handleThemeSelectClick}
                selectedThemeColor={selectedThemeColor}
                selectedThemeName={selectedThemeName}
              />
            }
          />
        </Routes>
        <Footer selectedThemeColor={selectedThemeColor} />
      </div>
    </BrowserRouter>
  );
}

export default App;
