import { useState } from "react";
import { Link,useParams } from "react-router-dom";
import { RiMenu4Fill } from "react-icons/ri";

const PersonalNav = ({ logo }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { username } = useParams("");
  
  const handleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div className="logo">
        <Link to={`/portfolio/${username}`}>{logo}</Link>
      </div>
      <div
        className={`${isMenuOpen ? "menu-active" : "menu-inactive"} nav-links personal-nav-links`}
      >
        {/* <Link to={`/portfolio/${username}/about`}>About</Link>
        <Link to={`/portfolio/${username}/contact`}>Contact</Link> */}
      </div>
      <RiMenu4Fill className="menuBtn" onClick={handleMenu} />
    </nav>
  );
};

export default PersonalNav;
