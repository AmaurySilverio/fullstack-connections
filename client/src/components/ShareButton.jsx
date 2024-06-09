import CopiedResults from "../components/CopiedResults";
import { useState } from "react";
const ShareButton = ({ resultsData, title, author }) => {
  const [copiedResults, setCopiedResults] = useState(false);

  const handleShareClick = () => {
    let copyData = `${title} \nby ${author} \n${resultsData.join("")}`;
    navigator.clipboard.writeText(copyData);

    // Alert the copied text
    setCopiedResults(true);
    // alert("Copied the text: " + copyData);
    setTimeout(() => {
      setCopiedResults(false);
    }, 2000);
  };
  return (
    <>
      <button className="button share-results" onClick={handleShareClick}>
        Share Results
      </button>
      <CopiedResults show={copiedResults} />
    </>
  );
};

export default ShareButton;
