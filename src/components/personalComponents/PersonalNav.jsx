import { useState } from "react";
import { Link } from "react-router-dom";
import { RiMenu4Fill } from "react-icons/ri";

const PersonalNav = ({logo}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  

  return (
    <nav>
      <div className="logo">
        <Link to={`/portfolio/${logo}`}>{logo}</Link>
      </div>
      <div
        className={`${isMenuOpen ? "menu-active" : "menu-inactive"} nav-links`}
      >
        {/* <Link to="/about">Learn more</Link>
        <Link to="/about">Learn more</Link> */}
      </div>
      <RiMenu4Fill className="menuBtn" onClick={handleMenu} />
    </nav>
  );
};

export default PersonalNav;
