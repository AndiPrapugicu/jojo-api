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
import Login from "./components/Login/Login";

function App() {
  const initialThemeColor = localStorage.getItem("selectedThemeColor") || "";
  const initialThemeName =
    localStorage.getItem("selectedThemeName") || "Default";
  const initialBackgroundColor =
    localStorage.getItem("backgroundColor") || "#ffffff";
  const [results, setResults] = useState([]);
  const [selectedThemeColor, setSelectedThemeColor] =
    useState(initialThemeColor);
  const [selectedThemeName, setSelectedThemeName] = useState(initialThemeName);
  const [navbarColor, setNavbarColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(
    initialBackgroundColor
  );
  const [selectedButtonTheme] = useState("");

  useEffect(() => {
    try {
      const color = localStorage.getItem("selectedThemeColor");
      document.body.style.setProperty("--app-background-color", color);
      const bgColor = localStorage.getItem("selectedBackgroundColor");
      document.body.style.setProperty("--app-content-bg-color", bgColor);
    } catch (error) {
      console.log("fail to load colors");
    }
  });

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

  const handleThemeSelectClick = (themeColor) => {
    setSelectedThemeName(selectedThemeColor);
    setSelectedThemeColor(themeColor);
    setNavbarColor(
      selectedThemeColor === "Create your own theme" ? themeColor : ""
    );
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
  };

  return (
    <BrowserRouter>
      <div
        id="root"
        className={`app ${selectedThemeName.toLowerCase()}-theme-color`}
      >
        <Navbar
          results={results}
          selectedThemeColor={selectedThemeColor}
          handleThemeSelectClick={handleThemeSelectClick}
          selectedThemeName={selectedThemeName}
          navbarColor={navbarColor}
          setNavbarColor={setNavbarColor}
          selectedButtonTheme={selectedButtonTheme}
        />
        <div className="app-content">
          <Routes>
            <Route
              path="/"
              selectedThemeColor={selectedThemeColor}
              element={
                <Home
                  results={results}
                  selectedThemeColor={selectedThemeColor}
                  handleThemeSelectClick={handleThemeSelectClick}
                  selectedThemeName={selectedThemeName}
                  selectedButtonTheme={selectedButtonTheme}
                />
              }
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
              element={
                <CharacterDetails selectedThemeName={selectedThemeName} />
              }
            />
            <Route
              path="/stands/:id"
              element={<StandDetails selectedThemeName={selectedThemeName} />}
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/themes"
              element={
                <Themes
                  handleThemeSelectClick={handleThemeSelectClick}
                  selectedThemeColor={selectedThemeColor}
                  selectedThemeName={selectedThemeName}
                  navbarColor={navbarColor}
                  setNavbarColor={setNavbarColor}
                  selectedBackgroundColor={backgroundColor}
                  setSelectedBackgroundColor={handleBackgroundColorChange}
                />
              }
            />
          </Routes>
        </div>
        <Footer selectedThemeColor={selectedThemeColor} />
      </div>
    </BrowserRouter>
  );
}

export default App;
