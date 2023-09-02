import { useEffect, useState } from "react";

const useHighlightColor = () => {
  const [highlight, setHighlight] = useState("");
  console.log(highlight);
  useEffect(() => {
    const listener = (e) => {
      const color = e.detail;
      setHighlight(color);
    };
    document.body.addEventListener("highlight-change", listener);

    return () => {
      document.body.removeEventListener("highlight-change", listener);
    };
  }, []);

  return highlight;
};

export default useHighlightColor;
