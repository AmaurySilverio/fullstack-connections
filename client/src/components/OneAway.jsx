const OneAway = ({ show }) => {
  const showHideClassName = show ? "" : "visibility-hidden";

  return (
    <div id={showHideClassName} className="one-away-container">
      <div id="elementToFadeInAndOut">
        <h2>One away...</h2>
      </div>
    </div>
  );
};

export default OneAway;
