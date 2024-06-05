const Hero = ({ title, author }) => {
  // LOGIC FOR DATE WITH COMMA
  let date = new Date();

  date.setHours(0, 0, 0, 0);
  let dateWithoutTimeAndMonth = date.toDateString().slice(7);
  let month = date.toLocaleString("default", {
    month: "long",
  });
  let fullDateWithComma =
    month +
    dateWithoutTimeAndMonth.slice(0, -5) +
    "," +
    dateWithoutTimeAndMonth.slice(-5);

  return (
    <>
      <div className="hero-container">
        <div className="hero-margin-container">
          <h2>
            <em className="game-title">{title}</em>{" "}
            <span className="game-author">by {author}</span>{" "}
            {/* <span className="game-date">
              {fullDateWithComma}
            </span> */}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Hero;
