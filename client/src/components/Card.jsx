import { useState, useEffect } from "react";
const Card = ({ name, onClick, category, difficulty, id }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    handleMediaQueryChange(mediaQuery); // Set initial state
    mediaQuery.addEventListener("change", handleMediaQueryChange); // Add listener for future changes

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange); // Cleanup listener on unmount
    };
  }, []);
  return (
    <>
      <div
        className="card"
        id={id}
        onClick={onClick}
        data-category={category}
        data-difficulty={difficulty}
        style={isMobile && name.length >= 9 ? { fontSize: "0.85em" } : {}}
      >
        {name}
      </div>
    </>
  );
};

export default Card;
