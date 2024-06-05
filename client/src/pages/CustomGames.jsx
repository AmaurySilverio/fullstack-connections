import { useState, useEffect } from "react";
import ConnectionsService from "../services/connections";
import TitleTags from "../components/TitleTags";

const CustomGames = () => {
  const [gameTitles, setGameTitles] = useState([]);

  useEffect(() => {
    ConnectionsService.getTitles().then((gameData) => {
      setGameTitles(gameTitles.concat(gameData));
    });
  }, []);

  return (
    <>
      <div className="custom-games-container">
        {gameTitles.map((info) => (
          <TitleTags
            key={info.id}
            title_id={info.id}
            title={info.title}
            author={info.author}
          />
        ))}
      </div>
    </>
  );
};

export default CustomGames;
