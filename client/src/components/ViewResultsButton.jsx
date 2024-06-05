const ViewResultsButton = ({ show, onClick }) => {
  return show ? (
    <button className="button view-results" onClick={onClick}>
      View Results
    </button>
  ) : null;
};
export default ViewResultsButton;
