import { func } from "prop-types";
import { useState } from "react";
import { SketchPicker } from "react-color";
import { changeBgColor, changeThemeColor } from "../../utils/functions";

const CreateYourOwnTheme = () => {
  const [themeColor, setThemeColor] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState("");

  const handleThemeColorChange = () => {
    setIsColorPickerOpen("theme");
  };
  const handleBodyColorChange = () => {
    setIsColorPickerOpen("background");
  };

  const handleThemeColorSelect = (color) => {
    setThemeColor(color.hex);
  };

  const handleBgColorSelect = (color) => {
    setBgColor(color.hex);
  };

  const setTheme = () => {
    changeThemeColor(themeColor);
    setIsColorPickerOpen("");
  };
  const setBg = () => {
    changeBgColor(bgColor);
    setIsColorPickerOpen("");
  };

  return (
    <div>
      <div key="navbar" className="navbar-create">
        <span>Theme</span>
        <button
          className="theme-button"
          onClick={() => handleThemeColorChange()}
        >
          Change Color
        </button>
      </div>
      ,
      <div key="background" className="background-create">
        <span>Background</span>
        <button
          className="theme-button"
          onClick={() => handleBodyColorChange()}
        >
          Change Color
        </button>
      </div>
      ,
      {isColorPickerOpen === "theme" && (
        <div>
          <div onClick={() => setIsColorPickerOpen(false)}>X</div>
          <SketchPicker color={themeColor} onChange={handleThemeColorSelect} />
          <button type="button" onClick={setTheme}>
            Ok
          </button>
        </div>
      )}
      {isColorPickerOpen === "background" && (
        <div>
          <div
            style={{ color: "red" }}
            onClick={() => setIsColorPickerOpen(false)}
          >
            X
          </div>
          <SketchPicker color={bgColor} onChange={handleBgColorSelect} />
          <button type="button" onClick={setBg}>
            Ok
          </button>
        </div>
      )}
    </div>
  );
};

CreateYourOwnTheme.propTypes = {
  setNavbarColor: func,
  setBackgroundColor: func,
  handleThemeSelectClick: func,
};

export default CreateYourOwnTheme;
