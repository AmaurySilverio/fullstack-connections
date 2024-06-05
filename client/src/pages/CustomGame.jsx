import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import Instructions from "../components/Instructions";
import MistakesRemaining from "../components/MistakesRemaining";
import ShuffleButton from "../components/ShuffleButton";
import DeselectAllButton from "../components/DeselectAllButton";
import SubmitButton from "../components/SubmitButton";
import ViewResultsButton from "../components/ViewResultsButton";
import Card from "../components/Card";
import MatchingBanners from "../components/MatchingBanners";
import ResultsModal from "../components/ResultsModal";
import SameGuess from "../components/SameGuess";
import OneAway from "../components/OneAway";
import ConnectionsService from "../services/connections";

const CustomGame = () => {
  // useParams for featured game
  let { title_id } = useParams();
  if (title_id == null) {
    title_id = 1;
  }
  const [shuffle, setShuffle] = useState(false);
  const [cardCount, setCardCount] = useState(0);
  const [clickedCardsCopy, setClickedCardsCopy] = useState([]);
  const [compareCards, setCompareCards] = useState([]);
  const [mistakesRemaining, setMistakesRemaining] = useState(4);
  const [mistakeBubbles, setMistakeBubbles] = useState([]);
  const [remainingCardsInPlay, setRemainingCardsInPlay] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [modal, setModal] = useState(false);
  const [sameGuess, setSameGuess] = useState(false);
  const [oneAway, setOneAway] = useState(false);
  const [sortedCategories, setSortedCategories] = useState([]);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [loadingGame, setLoadingGame] = useState(false);
  const [newGame, setNewGame] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    ConnectionsService.getCustomGame(title_id).then((gameData) => {
      setNewGame(gameData.cards);
      setTitle(gameData.title);
      setAuthor(gameData.author);
      let sortedCategoriesArr = [
        {
          names: {
            name1: gameData.cards[0].name,
            name2: gameData.cards[1].name,
            name3: gameData.cards[2].name,
            name4: gameData.cards[3].name,
          },
          id: gameData.cards[0].id,
          category: gameData.cards[0].category,
          difficulty: gameData.cards[0].difficulty,
        },
        {
          names: {
            name1: gameData.cards[4].name,
            name2: gameData.cards[5].name,
            name3: gameData.cards[6].name,
            name4: gameData.cards[7].name,
          },
          id: gameData.cards[4].id,
          category: gameData.cards[4].category,
          difficulty: gameData.cards[4].difficulty,
        },
        {
          names: {
            name1: gameData.cards[8].name,
            name2: gameData.cards[9].name,
            name3: gameData.cards[10].name,
            name4: gameData.cards[11].name,
          },
          id: gameData.cards[8].id,
          category: gameData.cards[8].category,
          difficulty: gameData.cards[8].difficulty,
        },
        {
          names: {
            name1: gameData.cards[12].name,
            name2: gameData.cards[13].name,
            name3: gameData.cards[14].name,
            name4: gameData.cards[15].name,
          },
          id: gameData.cards[12].id,
          category: gameData.cards[12].category,
          difficulty: gameData.cards[12].difficulty,
        },
      ];
      setSortedCategories(sortedCategories.concat(sortedCategoriesArr));
    });
  }, []);

  useEffect(() => {
    let currentGame = [...newGame];
    shuffleArray(currentGame);
    setCategoriesArr(currentGame);
  }, [loadingGame]);
  setTimeout(() => {
    setLoadingGame(true);
  }, 2000);

  // SHUFFLE FUNCTION
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  // SHUFFLE BUTTON FUNCTION
  const handleShuffle = () => {
    shuffleArray(categoriesArr);
    setShuffle(!shuffle);
  };
  // DESELECTALL BUTTON FUNCTION
  const handleDeselectAll = () => {
    setClickedCardsCopy(
      clickedCardsCopy.map((card) => card.removeAttribute("data-status"))
    );
    setClickedCardsCopy([]);
    setCompareCards([]);
    setCardCount(0);
  };

  // CARD CLICK FUNCTION
  const handleCardClick = (event) => {
    if (mistakeBubbles.length < 1) {
      let mistakeBubblesDOM =
        event.target.parentElement.nextElementSibling.children[0].children[0]
          .children;
      let mistakesArr = [...mistakeBubblesDOM];
      setMistakeBubbles(mistakeBubbles.concat(mistakesArr));
    }

    let cardAttributes = event.target.attributes;
    // LOGIC FOR CLICKING CLICKED CARD
    if (cardAttributes["hasOwnProperty"]("data-status")) {
      event.target.removeAttribute("data-status");
      const updatedCardCount = cardCount - 1;
      setCardCount(updatedCardCount);
      let cardId = cardAttributes["id"].value;
      setCompareCards(compareCards.filter((card) => card.id !== cardId));
      setClickedCardsCopy(
        clickedCardsCopy.filter((card) => card.id !== cardId)
      );
    } else {
      if (cardCount === 4) {
        return;
      }

      event.target.setAttribute("data-status", "clicked");
      const updatedCardCount = cardCount + 1;
      setCardCount(updatedCardCount);
      let cardName = event.target.innerHTML;
      let cardId = cardAttributes["id"].value;
      let cardCategory = cardAttributes["data-category"].value;
      let cardDifficulty = cardAttributes["data-difficulty"].value;
      const clickedCard = {
        name: cardName,
        id: cardId,
        category: cardCategory,
        difficulty: cardDifficulty,
      };
      setCompareCards(compareCards.concat(clickedCard));
      let cardClicked = event.target;
      setClickedCardsCopy(clickedCardsCopy.concat(cardClicked));
    }
  };
  // SUBMIT BUTTON FUNCTION
  const handleSubmit = (event) => {
    let cards = event.target.parentElement.parentElement.children[0].children;
    let submittedCards = Array.from(cards).filter((card) => card.attributes[4]);
    submittedCards.map((card) => card.setAttribute("class", "card-submitted"));

    let attemptedCardsDifficulty = compareCards.map((card) => card.difficulty);
    let attemptCardsIDs = compareCards.map((card) => card.id);
    attemptCardsIDs.sort(function (a, b) {
      return a - b;
    });
    let currentAttempt = {
      difficulty: attemptedCardsDifficulty,
      id: attemptCardsIDs,
    };

    let previousAttemptIds = attempts.map((card) => card.id);

    let previousAttempt = false;
    previousAttemptIds.map((cardIds) => {
      if (cardIds.join(",") === attemptCardsIDs.join(",")) {
        previousAttempt = true;
        setSameGuess(true);
      }
    });
    previousAttempt ? null : setAttempts(attempts.concat(currentAttempt));

    let selectedCardsArr = compareCards.map((card) => card.category);
    const allEqual = (arr) => arr.every((val) => val === arr[0]);
    if (!allEqual(selectedCardsArr)) {
      setTimeout(() => {
        submittedCards.map((card) => card.setAttribute("class", "wrong-guess"));
      }, 1000);
      // Count occurrences of each unique string
      const valueCounts = selectedCardsArr.reduce((counts, val) => {
        counts[val] = (counts[val] || 0) + 1;
        return counts;
      }, {});

      // Check if any string appears at least 3 times
      if (
        Object.values(valueCounts).some((count) => count >= 3) &&
        !previousAttempt &&
        mistakesRemaining > 1
      ) {
        setTimeout(() => {
          setOneAway(true);
        }, 1000);
      }

      if (mistakesRemaining === 1 && !previousAttempt) {
        let matchedCardsDifficulty = matchedCards.map(
          (card) => card.difficulty
        );
        let remainingSortedCategories = sortedCategories.filter(
          (card) => !matchedCardsDifficulty.includes(card.difficulty)
        );
        setTimeout(() => {
          setMatchedCards(matchedCards.concat(remainingSortedCategories));
          setCategoriesArr([]);
          setClickedCardsCopy([]);
          setCompareCards([]);
          setCardCount(0);
        }, 2000);
      }
      if (previousAttempt) {
        previousAttempt = false;
        setTimeout(() => {
          setSameGuess(false);
          submittedCards.map((card) => card.removeAttribute("class"));
          submittedCards.map((card) => card.setAttribute("class", "card"));
        }, 2000);
        return;
      } else {
        mistakeBubbles.map((bubble) => {
          if (bubble.attributes[1].value === mistakesRemaining.toString()) {
            setTimeout(() => {
              bubble.setAttribute("data-hidden", "hidden");
            }, 1400);
          }
        });
        setTimeout(() => {
          const updatedMistakesRemaining = mistakesRemaining - 1;
          setMistakesRemaining(updatedMistakesRemaining);
          setOneAway(false);
        }, 2000);
      }
      setTimeout(() => {
        submittedCards.map((card) => card.removeAttribute("class"));
        submittedCards.map((card) => card.setAttribute("class", "card"));
      }, 2000);
    }
    if (allEqual(selectedCardsArr)) {
      setTimeout(() => {
        submittedCards.map((card) =>
          card.setAttribute("class", "correct-guess")
        );
      }, 1000);

      let matchedCardIds = clickedCardsCopy.map((card) => Number(card.id));
      let matchedCardsCategory = compareCards.map((card) => card.difficulty);

      matchedCardIds.sort((a, b) => a - b);
      let remainingCards = categoriesArr.filter(
        (card) => !matchedCardIds.includes(card.id)
      );
      setRemainingCardsInPlay(remainingCards);
      let difficultyKey = matchedCardsCategory[0];
      let obj = { difficulty: difficultyKey };
      let matchingCardsBannerData = {
        names: {
          name1: compareCards[0].name,
          name2: compareCards[1].name,
          name3: compareCards[2].name,
          name4: compareCards[3].name,
        },
        category: selectedCardsArr[0],
        difficulty: compareCards[0].difficulty,
        id: matchedCardIds[0],
      };
      setTimeout(() => {
        setMatchedCards(matchedCards.concat(matchingCardsBannerData));
        setCategoriesArr([...remainingCards]);
      }, 2000);

      setClickedCardsCopy([]);
      setCompareCards([]);
      setCardCount(0);
    }
  };
  const handleModalClose = (event) => {
    setModal(true);
  };
  const handleViewResults = () => {
    setModal(false);
  };

  return (
    <>
      <Hero title={title} author={author} />
      <Instructions />
      <SameGuess show={sameGuess} />
      <OneAway show={oneAway} />
      {loadingGame ? (
        <div className="gameboard-container" id="fade-in">
          <div className="grid grid-cols-4 gap-2">
            {matchedCards.length >= 1 && mistakesRemaining >= 1
              ? matchedCards.map((card) => (
                  <MatchingBanners
                    key={card.id}
                    names={card.names}
                    category={card.category}
                    id={card.difficulty}
                  />
                ))
              : null}
            {mistakesRemaining === 0
              ? matchedCards.map((card) => (
                  <MatchingBanners
                    key={card.id}
                    names={card.names}
                    category={card.category}
                    id={card.difficulty}
                  />
                ))
              : null}
            <ResultsModal
              show={matchedCards.length === 4 && mistakesRemaining >= 1}
              onClick={handleModalClose}
              closeModal={modal}
              attempts={attempts}
              title={title}
              author={author}
              text="Good job!"
            />
            <ResultsModal
              show={matchedCards.length === 4 && mistakesRemaining === 0}
              onClick={handleModalClose}
              closeModal={modal}
              attempts={attempts}
              title={title}
              author={author}
              text="Next Time!"
            />
            {categoriesArr
              ? categoriesArr.map((card) => (
                  <Card
                    key={card.id}
                    id={card.id}
                    name={card.name}
                    category={card.category}
                    difficulty={card.difficulty}
                    onClick={handleCardClick}
                  />
                ))
              : null}
          </div>
          <MistakesRemaining
            show={matchedCards.length <= 3 && mistakesRemaining >= 1}
          />
          <div className="buttons">
            <ShuffleButton
              show={matchedCards.length <= 3 && mistakesRemaining >= 1}
              onClick={handleShuffle}
            />
            <DeselectAllButton
              show={matchedCards.length <= 3 && mistakesRemaining >= 1}
              disabled={!cardCount > 0}
              onClick={handleDeselectAll}
            />
            <SubmitButton
              show={matchedCards.length <= 3 && mistakesRemaining >= 1}
              disabled={cardCount !== 4}
              onClick={handleSubmit}
            />
            <ViewResultsButton
              show={matchedCards.length === 4 || mistakesRemaining === 0}
              onClick={handleViewResults}
            />
          </div>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </>
  );
};

export default CustomGame;
