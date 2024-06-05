import { Link } from "react-router-dom";

const TitleTags = ({ title, author, title_id }) => {
  return (
    <Link to={`/customgame/${title_id}`}>
      <p>
        <span className="custom-game-title">{title}</span>{" "}
        <span className="custom-game-author">by {author}</span>
      </p>
    </Link>
  );
};

export default TitleTags;
