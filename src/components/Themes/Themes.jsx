import { useState } from "react";
import "./Themes.css";
import PropTypes from "prop-types";

function Themes({
  handleThemeSelectClick,
  selectedThemeColor,
  selectedThemeName,
}) {
  const themes = [
    {
      name: "Theme Select",
      options: [
        <div key="default" className="default-select">
          <button onClick={() => handleThemeSelectClick("Default", "#000")}>
            Default
          </button>
        </div>,
        <div key="vintage" className="vintage-select">
          <button onClick={() => handleThemeSelectClick("Vintage", "#4C4B16")}>
            Vintage
          </button>
        </div>,
        <div key="gold" className="gold-select">
          <button onClick={() => handleThemeSelectClick("Gold", "#D36B00")}>
            Gold
          </button>
        </div>,
        <div key="space" className="space-select">
          <button onClick={() => handleThemeSelectClick("Space", "#001C30")}>
            Space
          </button>
        </div>,
        <div key="purple" className="purple-select">
          <button onClick={() => handleThemeSelectClick("Purple", "#790252")}>
            Purple
          </button>
        </div>,
        <div key="red" className="red-select">
          <button onClick={() => handleThemeSelectClick("Red", "#850000")}>
            Red
          </button>
        </div>,
      ],
    },
    {
      name: "Create your own theme",
      options: [
        <div key="navbar" className="navbar-create">
          <span>Navbar</span>
          <button
            className="theme-button"
            onClick={() => handleThemeColorChange("")}
          >
            Change Color
          </button>
        </div>,
        <div key="body" className="body-create">
          <span>Body</span>
          <button
            className="theme-button"
            onClick={() => handleThemeColorChange("")}
          >
            Change Color
          </button>
        </div>,
        <div key="footer" className="footer-create">
          <span>Footer</span>
          <button
            className="theme-button"
            onClick={() => handleThemeColorChange("")}
          >
            Change Color
          </button>
        </div>,
      ],
    },
  ];

  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelectClick = (option) => {
    setSelectedOption(option);
  };

  const handleThemeColorChange = (color) => {
    setSelectedOption("");
    setSelectedTheme("Create your own theme");
    handleThemeSelectClick("Navbar", color);
    handleFooterColorChange(color);
  };

  const handleFooterColorChange = (color) => {
    const footer = document.querySelector(".footer");
    if (footer) {
      footer.style.setProperty("--footer-bg-color", color);
    }
  };

  const handleThemeSelect = (theme, themeColor) => {
    console.log("Selected Theme:", theme);
    console.log("Theme Color:", themeColor);
    setSelectedTheme(theme);
    setSelectedOption("");
    handleThemeSelectClick(theme, themeColor);
  };

  const themesStyle = { backgroundColor: selectedThemeColor };

  return (
    <div className="themes-wrapper">
      <div className="themes" style={themesStyle}>
        <div className="themes-container">
          <div>Choose a Theme</div>
          <div className="theme">
            {themes.map((theme) => (
              <div
                key={theme.name}
                className={`themes-select ${theme.name.toLowerCase()}-select ${selectedThemeName.toLowerCase()}-theme`}
                onClick={() => handleThemeSelect(theme.name, theme.themeColor)}
              >
                {theme.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedTheme && (
        <div className="selected-item-wrapper">
          <div className="selected-item">{selectedTheme}</div>
          {themes.find((theme) => theme.name === selectedTheme) && (
            <div className="options-wrapper">
              {themes
                .find((theme) => theme.name === selectedTheme)
                .options.map((option) => (
                  <div
                    key={option.key}
                    className={`option ${
                      selectedOption === option ? "selected" : ""
                    }`}
                    onClick={() =>
                      selectedTheme === "Create your own theme"
                        ? handleOptionSelectClick(option)
                        : handleOptionSelectClick(option.props.className)
                    }
                  >
                    {option}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

Themes.propTypes = {
  handleThemeSelectClick: PropTypes.func.isRequired,
  selectedThemeColor: PropTypes.string.isRequired,
  selectedThemeName: PropTypes.string.isRequired,
};

export default Themes;
