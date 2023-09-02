export const setHighlight = () => {
  document.body.style.setProperty("--highlight", "vintage", "important");
};

export function changeThemeColor(themeColor) {
  localStorage.setItem("selectedThemeColor", themeColor);
  setHighlight();
  document.body.style.setProperty(
    "--app-background-color",
    themeColor,
    "important"
  );
}

export function changeBgColor(bgColor) {
  localStorage.setItem("selectedBackgroundColor", bgColor);
  document.body.style.setProperty(
    "--app-content-bg-color",
    bgColor,
    "important"
  );
}

export const getHighlight = () => {
  try {
    const highlight = localStorage.getItem("highlight");
    return highlight;
  } catch (error) {
    console.error("error getting highlight");
  }
};
