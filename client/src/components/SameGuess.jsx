const SameGuess = ({ show }) => {
  const showHideClassName = show ? "" : "visibility-hidden";

  return (
    <div id={showHideClassName}>
      <div className="same-guess-container" id="elementToFadeInAndOut">
        <h2>Already Guessed!</h2>
      </div>
    </div>
  );
};

export default SameGuess;
