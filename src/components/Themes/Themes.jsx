import { useState } from "react";
import "./Themes.css";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import CreateYourOwnTheme from "./CreateYourOwnTheme";
import { changeBgColor, changeThemeColor } from "../../utils/functions";
import { MdOutlineColorLens } from "react-icons/md";

function Themes({
  handleThemeSelectClick,
  selectedThemeColor,
  selectedThemeName,
  navbarColor,
  setNavbarColor,
  setSelectedBackgroundColor,
}) {
  const changeAppTheming = (type, themeColor, bgColor) => {
    localStorage.setItem("highlight", type);
    const customEvent = new CustomEvent("highlight-change", { detail: type });
    document.body.dispatchEvent(customEvent);
    changeBgColor(bgColor);
    changeThemeColor(themeColor);
  };
  const themes = [
    {
      name: "Theme Select",
      options: [
        <div key="default" className="default-select">
          <button
            onClick={() => changeAppTheming("default", "#000000", "#00000026")}
          >
            Default
          </button>
        </div>,
        <div key="vintage" className="vintage-select">
          <button
            onClick={() =>
              changeAppTheming(
                "vintage",
                "var(--vintage-theme-color-base)",
                "var(--vintage-theme-color)"
              )
            }
          >
            Vintage
          </button>
        </div>,
        <div key="gold" className="gold-select">
          <button
            onClick={() =>
              changeAppTheming(
                "gold",
                "var(--gold-theme-color-base)",
                "var(--gold-theme-color)"
              )
            }
          >
            Gold
          </button>
        </div>,
        <div key="space" className="space-select">
          <button
            onClick={() =>
              changeAppTheming(
                "space",
                "var(--space-theme-color-base)",
                "var(--space-theme-color)"
              )
            }
          >
            Space
          </button>
        </div>,
        <div key="purple" className="purple-select">
          <button
            onClick={() =>
              changeAppTheming(
                "purple",
                "var(--purple-theme-color-base)",
                "var(--purple-theme-color)"
              )
            }
          >
            Purple
          </button>
        </div>,
        <div key="red" className="red-select">
          <button
            onClick={() =>
              changeAppTheming(
                "red",
                "var(--red-theme-color-base)",
                "var(--red-theme-color)"
              )
            }
          >
            Red
          </button>
        </div>,
      ],
    },
    {
      name: "Create your own theme",
      options: [
        <CreateYourOwnTheme
          key={1}
          setNavbarColor={setNavbarColor}
          setBackgroundColor={setSelectedBackgroundColor}
          handleThemeSelectClick={handleThemeSelectClick}
        />,
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
  const [selectedButtonTheme, setSelectedButtonTheme] = useState("");

  const handleOptionSelectClick = (option) => {
    setSelectedOption(option);
    if (option === "navbar-create") {
      setShowNavbarColorPickerButton(true);
    } else {
      setShowNavbarColorPickerButton(false);
    }
  };

  const handleFooterColorChange = () => {};

  const handleThemeSelect = (theme, themeColor) => {
    setSelectedTheme(theme);
    setSelectedOption("");
    setSelectedButtonTheme(`${theme.toLowerCase()}-theme-color`);
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
        setSelectedBackgroundColor(backgroundColorWithOpacity);
        localStorage.setItem("selectedThemeColor", "background");
        localStorage.setItem("selectedThemeName", "Create your own theme");
      }
    }
  };

  const handleNavbarColorChange = (color) => {
    setNavbarColor(color.hex);
  };

  const handleSelectNavbarColor = () => {
    setIsColorPickerOpen(true);
    setSelectedOption("navbar-create");
    setShowNavbarColorPickerButton(true);
  };

  return (
    <div className="themes-wrapper">
      <div className="themes">
        <div className="themes-container">
          <div>
            <MdOutlineColorLens />
            Choose a Theme
          </div>
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
  setSelectedBackgroundColor: PropTypes.func.isRequired,
};

export default Themes;
