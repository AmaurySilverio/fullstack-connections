import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConnectionsService from "../services/connections";

const CreateGame = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [easyDescription, setEasyDescription] = useState("");
  const [easyAnswers, setEasyAnswers] = useState([]);
  const [mediumDescription, setMediumDescription] = useState("");
  const [mediumAnswers, setMediumAnswers] = useState([]);
  const [hardDescription, setHardDescription] = useState("");
  const [hardAnswers, setHardAnswers] = useState([]);
  const [trickyDescription, setTrickyDescription] = useState("");
  const [trickyAnswers, setTrickyAnswers] = useState([]);
  const [connections, setConnections] = useState([]);

  const splitStrByComma = (str) => {
    let answer = str.split(",");
    return answer;
  };
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let cards =
      event.target.parentElement.parentElement.children[0].children[1]
        .children[1].children;
    let submittedCards = Array.from(cards);
    let mapped = submittedCards.map((card) => {
      card.setAttribute("data-status", "create-form-submitted");
    });

    let updatedEasyAns = easyAnswers.map((string) =>
      string.trim().toUpperCase()
    );
    let updatedMediumAns = mediumAnswers.map((string) =>
      string.trim().toUpperCase()
    );
    let updatedHardAns = hardAnswers.map((string) =>
      string.trim().toUpperCase()
    );
    let updatedTrickyAns = trickyAnswers.map((string) =>
      string.trim().toUpperCase()
    );
    let newGame = {
      title: title,
      author: author,
      cards: [
        {
          name: updatedEasyAns[0],
          category: easyDescription.toUpperCase(),
          difficulty: "EASY",
        },
        {
          name: updatedEasyAns[1],
          category: easyDescription.toUpperCase(),
          difficulty: "EASY",
        },
        {
          name: updatedEasyAns[2],
          category: easyDescription.toUpperCase(),
          difficulty: "EASY",
        },
        {
          name: updatedEasyAns[3],
          category: easyDescription.toUpperCase(),
          difficulty: "EASY",
        },
        {
          name: updatedMediumAns[0],
          category: mediumDescription.toUpperCase(),
          difficulty: "MEDIUM",
        },
        {
          name: updatedMediumAns[1],
          category: mediumDescription.toUpperCase(),
          difficulty: "MEDIUM",
        },
        {
          name: updatedMediumAns[2],
          category: mediumDescription.toUpperCase(),
          difficulty: "MEDIUM",
        },
        {
          name: updatedMediumAns[3],
          category: mediumDescription.toUpperCase(),
          difficulty: "MEDIUM",
        },
        {
          name: updatedHardAns[0],
          category: hardDescription.toUpperCase(),
          difficulty: "HARD",
        },
        {
          name: updatedHardAns[1],
          category: hardDescription.toUpperCase(),
          difficulty: "HARD",
        },
        {
          name: updatedHardAns[2],
          category: hardDescription.toUpperCase(),
          difficulty: "HARD",
        },
        {
          name: updatedHardAns[3],
          category: hardDescription.toUpperCase(),
          difficulty: "HARD",
        },
        {
          name: updatedTrickyAns[0],
          category: trickyDescription.toUpperCase(),
          difficulty: "TRICKY",
        },
        {
          name: updatedTrickyAns[1],
          category: trickyDescription.toUpperCase(),
          difficulty: "TRICKY",
        },
        {
          name: updatedTrickyAns[2],
          category: trickyDescription.toUpperCase(),
          difficulty: "TRICKY",
        },
        {
          name: updatedTrickyAns[3],
          category: trickyDescription.toUpperCase(),
          difficulty: "TRICKY",
        },
      ],
    };
    ConnectionsService.create(newGame).then((gameData) => {
      setConnections(connections.concat(gameData));
      setTimeout(() => {
        navigate(`/customgame/${gameData.id}`);
      }, 1500);
    });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleEasyDescChange = (event) => {
    let easyDescription = event.target.value;
    setEasyDescription(event.target.value);
  };
  const handleEasyAnsChange = (event) => {
    setEasyAnswers(splitStrByComma(event.target.value));
  };
  const handleMediumDescChange = (event) => {
    setMediumDescription(event.target.value);
  };
  const handleMediumAnsChange = (event) => {
    setMediumAnswers(splitStrByComma(event.target.value));
  };
  const handleHardDescChange = (event) => {
    setHardDescription(event.target.value);
  };
  const handleHardAnsChange = (event) => {
    setHardAnswers(splitStrByComma(event.target.value));
  };
  const handleTrickyDescChange = (event) => {
    setTrickyDescription(event.target.value);
  };
  const handleTrickyAnsChange = (event) => {
    setTrickyAnswers(splitStrByComma(event.target.value));
  };
  return (
    <>
      <div className="create-game-container">
        <div className="create-game-content">
          <h2 className="create-game-title">Create your own game!</h2>
          <form className="create-game-form" onSubmit={handleFormSubmit}>
            <div className="category-title category">
              <label>Title</label>
              <input
                placeholder="My Connections"
                value={title}
                onChange={handleTitleChange}
                required
              />
              <label>Author</label>
              <input
                placeholder="John Smith"
                value={author}
                onChange={handleAuthorChange}
                required
              />
            </div>
            <div className="category-cards">
              <div className="easy-category category" id="EASY">
                <label>Description(Category)</label>
                <input
                  placeholder="Food"
                  value={easyDescription}
                  onChange={handleEasyDescChange}
                  required
                />
                <label>Answers(Comma-separated)</label>
                <input
                  type="text"
                  pattern="^[^,]+,[^,]+,[^,]+,[^,]+$"
                  title="Must include 4 answers, Separated by 3 commas"
                  placeholder="chow, eats, fare, grub"
                  value={easyAnswers}
                  onChange={handleEasyAnsChange}
                  required
                />
              </div>
              <div className="medium-category category" id="MEDIUM">
                <label>Description(Category)</label>
                <input
                  placeholder="Pilot"
                  value={mediumDescription}
                  onChange={handleMediumDescChange}
                  required
                />
                <label>Answers(Comma-separated)</label>
                <input
                  type="text"
                  pattern="^[^,]+,[^,]+,[^,]+,[^,]+$"
                  title="Must include 4 answers, Separated by 3 commas"
                  placeholder="direct, guide, lead, steer"
                  value={mediumAnswers}
                  onChange={handleMediumAnsChange}
                  required
                />
              </div>
              <div className="hard-category category" id="HARD">
                <label>Description(Category)</label>
                <input
                  placeholder="Intimidate"
                  value={hardDescription}
                  onChange={handleHardDescChange}
                  required
                />
                <label>Answers(Comma-separated)</label>
                <input
                  type="text"
                  pattern="^[^,]+,[^,]+,[^,]+,[^,]+$"
                  title="Must include 4 answers, Separated by 3 commas"
                  placeholder="bully, cow, daunt, rattle"
                  value={hardAnswers}
                  onChange={handleHardAnsChange}
                  required
                />
              </div>
              <div className="tricky-category category" id="TRICKY">
                <label>Description(Category)</label>
                <input
                  placeholder="___ Market"
                  value={trickyDescription}
                  onChange={handleTrickyDescChange}
                  required
                />
                <label>Answers(Comma-separated)</label>
                <input
                  type="text"
                  pattern="^[^,]+,[^,]+,[^,]+,[^,]+$"
                  title="Must include 4 answers, Separated by 3 commas"
                  placeholder="bull, flea, meat, stock"
                  value={trickyAnswers}
                  onChange={handleTrickyAnsChange}
                  required
                />
              </div>
            </div>
            <button className="create-game-button" type="submit">
              Generate
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateGame;
