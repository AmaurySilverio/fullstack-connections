const CopiedResults = ({ show }) => {
  const showHideClassName = show ? "" : "visibility-hidden";

  return (
    <div id={showHideClassName} className="copied-results-container">
      <div id="elementToFadeInAndOut">
        <h2>Copied results to clipboard</h2>
      </div>
    </div>
  );
};

export default CopiedResults;
