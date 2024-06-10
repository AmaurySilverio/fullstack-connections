import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="made-by">
          made by{" "}
          <a href="https://amaurycodes.netlify.app" target="_blank">
            Amaury
          </a>{" "}
          &copy; 2024
        </div>
        <div className="delete-blurb">
          To delete a game you made or chat, email me at{" "}
          <span className="email">amaurycodes@gmail.com</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
