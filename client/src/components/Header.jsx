import { Link } from "react-router-dom";
import HeaderButton from "./HeaderButton";

const Header = () => {
  const handleReload = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };
  return (
    <>
      <div className="header-container">
        <Link to="/" onClick={handleReload}>
          <HeaderButton text="Featured Game" className="hover-color-1" />
        </Link>
        <Link to="/creategame">
          <HeaderButton text="Create Game" className="hover-color-2" />
        </Link>
        <Link to="/customgames">
          <HeaderButton text="Custom Games" className="hover-color-3" />
        </Link>
      </div>
    </>
  );
};

export default Header;
