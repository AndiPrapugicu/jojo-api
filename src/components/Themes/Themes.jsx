import { useState } from "react";
import "./Themes.css";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";

function Themes({
  handleThemeSelectClick,
  selectedThemeColor,
  selectedThemeName,
  navbarColor,
  setNavbarColor,
  setBackgroundColor,
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
          <span>Body</span>
          <button
            className="theme-button"
            onClick={() => handleThemeColorChange("")}
          >
            Change Color
          </button>
        </div>,
        <div key="background" className="background-create">
          <span>Background</span>
          <button
            className="theme-button"
            onClick={() => handleThemeColorChange("background")}
          >
            Change Color
          </button>
        </div>,
      ],
    },
  ];

  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [colorPickerTheme] = useState(selectedThemeColor);
  const [tempThemeColor, setTempThemeColor] = useState("#000");
  const [showNavbarColorPickerButton, setShowNavbarColorPickerButton] =
    useState(false);
  const initialBackgroundColor =
    localStorage.getItem("backgroundColor") || "#ffffff";
  const [backgroundSectionColor, setBackgroundSectionColor] = useState(
    initialBackgroundColor
  );

  const handleOptionSelectClick = (option) => {
    setSelectedOption(option);
    if (option === "navbar-create") {
      setShowNavbarColorPickerButton(true);
    } else {
      setShowNavbarColorPickerButton(false);
    }
  };

  const handleThemeColorChange = () => {
    setSelectedOption("");
    setSelectedTheme("Create your own theme");
    setIsColorPickerOpen(true);
  };

  const handleFooterColorChange = (color) => {
    const footer = document.querySelector(".footer");
    if (footer) {
      footer.style.setProperty("--footer-bg-color", color);
    }
  };

  const handleThemeSelect = (theme, themeColor) => {
    setSelectedTheme(theme);
    setSelectedOption("");
    handleThemeSelectClick(theme, themeColor);
  };

  const handleColorPickerChange = (color) => {
    setTempThemeColor(color.hex);
  };

  const handleColorPickerClose = () => {
    setIsColorPickerOpen(false);
    if (colorPickerTheme) {
      handleThemeSelectClick(colorPickerTheme, tempThemeColor);
      handleFooterColorChange(tempThemeColor);
      if (colorPickerTheme === "navbar") {
        setNavbarColor(tempThemeColor);
      } else if (colorPickerTheme === "background") {
        const backgroundColorWithOpacity = `${tempThemeColor}33`;
        setBackgroundColor(backgroundColorWithOpacity);
        localStorage.setItem("selectedThemeColor", "background");
        localStorage.setItem("selectedThemeName", "Create your own theme");
      }
    }
  };

  const handleNavbarColorChange = (color) => {
    setNavbarColor(color.hex);
  };

  const themesStyle = { backgroundColor: selectedThemeColor };

  const handleSelectNavbarColor = () => {
    setIsColorPickerOpen(true);
    setSelectedOption("navbar-create");
    setShowNavbarColorPickerButton(true);
  };

  return (
    <div className="themes-wrapper">
      <div
        className="themes"
        style={{
          themesStyle,
          backgroundColor:
            selectedThemeColor === "background"
              ? backgroundSectionColor
              : selectedThemeColor,
        }}
      >
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
              {isColorPickerOpen && (
                <div className="color-picker-modal">
                  <SketchPicker
                    color={tempThemeColor}
                    onChange={handleColorPickerChange}
                  />
                  <div className="button-container">
                    <button onClick={handleColorPickerClose}>Close</button>
                    <button
                      className="select-color-button"
                      onClick={handleColorPickerClose}
                    >
                      Select Color
                    </button>
                  </div>
                  {showNavbarColorPickerButton && (
                    <button onClick={handleSelectNavbarColor}>
                      Select Color
                    </button>
                  )}
                </div>
              )}
              {selectedOption === "navbar-create" && (
                <div className="color-picker-modal">
                  <SketchPicker
                    color={navbarColor}
                    onChange={handleNavbarColorChange}
                  />
                  {showNavbarColorPickerButton && (
                    <button onClick={handleSelectNavbarColor}>
                      Select Color
                    </button>
                  )}
                  <button onClick={handleColorPickerClose}>Close</button>
                </div>
              )}
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
  navbarColor: PropTypes.string.isRequired,
  setNavbarColor: PropTypes.func.isRequired,
  setBackgroundColor: PropTypes.func.isRequired,
};

export default Themes;
