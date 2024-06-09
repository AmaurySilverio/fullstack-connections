import { useState, useEffect } from "react";
import ConnectionsService from "../services/connections";
import TitleTags from "../components/TitleTags";

const CustomGames = () => {
  const [gameTitles, setGameTitles] = useState([]);
  const [loadingTitles, setLoadingTitles] = useState(false);
  const [titlesLoaded, setTitlesLoaded] = useState(false);

  useEffect(() => {
    ConnectionsService.getTitles().then((gameData) => {
      setGameTitles(gameTitles.concat(gameData));
      setTitlesLoaded(true);
    });
  }, []);
  useEffect(() => {
    if (titlesLoaded) {
      setLoadingTitles(true);
    }
  }, [titlesLoaded, gameTitles]);

  return (
    <>
      {loadingTitles ? (
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
      ) : (
        <div className="loader"></div>
      )}
    </>
  );
};

export default CustomGames;
