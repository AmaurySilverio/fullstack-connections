const HeaderButton = ({ text, className }) => {
  return (
    <div className={`header-button-container ${className}`}>
      <button>{text}</button>
    </div>
  );
};

export default HeaderButton;
