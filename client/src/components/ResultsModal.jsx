import { Link } from "react-router-dom";
import { createElement } from "react";
import ShareButton from "./ShareButton";
import CreateButton from "./CreateButton";

const WinnerModal = ({
  show,
  onClick,
  closeModal,
  attempts,
  text,
  author,
  title,
}) => {
  if (!show) {
    return null;
  }
  if (closeModal) {
    return null;
  }

  const showHideClassName = show ? "winner-modal-wrapper" : "display-none";

  let attemptsInColor = [];
  let resultsData = [];
  let difficultyToColor = attempts.map((attempt) => {
    attempt.difficulty;
    for (let i = 0; i < attempt.difficulty.length; i++) {
      if (attempt.difficulty[i] === "EASY") {
        attemptsInColor.push("bg-yellow");
      }
      if (attempt.difficulty[i] === "MEDIUM") {
        attemptsInColor.push("bg-green");
      }
      if (attempt.difficulty[i] === "HARD") {
        attemptsInColor.push("bg-blue");
      }
      if (attempt.difficulty[i] === "TRICKY") {
        attemptsInColor.push("bg-purple");
      }
    }
  });
  let count = 0;
  const attemptsVisual = () => {
    attemptsInColor.forEach((attempt) => {
      let attemptsVisualGrid = document.getElementById("attempts-visual-row");

      let attemptBlock = document.createElement("span");
      if (attempt.includes("green")) {
        attemptBlock.setAttribute("class", "attempts-visual-block-green");
        resultsData.push("🟩");
        count++;
      }
      if (attempt.includes("blue")) {
        attemptBlock.setAttribute("class", "attempts-visual-block-blue");
        resultsData.push("🟦");
        count++;
      }
      if (attempt.includes("yellow")) {
        attemptBlock.setAttribute("class", "attempts-visual-block-yellow");
        resultsData.push("🟨");
        count++;
      }
      if (attempt.includes("purple")) {
        attemptBlock.setAttribute("class", "attempts-visual-block-purple");
        resultsData.push("🟪");
        count++;
      }
      attemptsVisualGrid.append(attemptBlock);
      if (count % 4 === 0) {
        resultsData.push(" ");
        resultsData.push("\n");
      }
    });
  };
  setTimeout(() => {
    attemptsVisual();
  }, 10);
  return (
    <div id={showHideClassName}>
      <div className="winner-modal-container">
        <div className="winner-modal-button-container" onClick={onClick}>
          <button className="winner-modal-button">
            Back to game
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 close"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <article className="winner-modal-article">
          <div className="winner-modal-content">
            <h2>{text}</h2>
            <h3>
              {title} by {author}
            </h3>
            <h3>Your attempts are below.</h3>
            <div className="attempts-visual-container">
              <div id="attempts-visual-row" className="grid grid-cols-4"></div>
            </div>
          </div>
        </article>
        <div className="buttons modalButtons">
          <ShareButton
            resultsData={resultsData}
            title={title}
            author={author}
          />
          <Link to="/creategame">
            <CreateButton />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
