import { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import {RiMenu4Fill} from 'react-icons/ri'
import { useAuth } from "../context/AuthContext";
import { TiArrowSortedDown } from "react-icons/ti";
import {BiLogInCircle} from 'react-icons/bi'
import { FiSettings } from "react-icons/fi";
const Nav = () => {
  
  const history =useHistory()
  const {currentUser,signOut}=useAuth()
  const [isMenuOpen,setMenuOpen] =useState(false)
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  
  const handleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };
    const handleDropDown = () => {
      setDropDownOpen(!isDropDownOpen);
    };
    async function handleSignOut (){
      try{
         await signOut()
         history.push('/')
      }
      catch(err){
        console.log(err)
      }
    }
    return (
      <nav>
        
          <Link className="logo" to="/">
            Portfolio Builder
            {/* <img
              src="\images\portfolio-builder-logo.svg"
              alt=""
              className='logo-img'
            /> */}
          </Link>
       
        <div
          className={`${
            isMenuOpen ? "menu-active" : "menu-inactive"
          } nav-links`}
        >
          <Link to="/about">Learn more</Link>
          {!currentUser && <Link to="/sign-in">Sign in</Link>}
          {!currentUser && (
            <Link to="/create-account" className="create-acc-btn">
              Create Account
            </Link>
          )}
          {currentUser && (
            <Link to="/dashboard" id="dashboard-btn">
              Dashboard
            </Link>
          )}
          {currentUser && (
            <div className="drop-btn-container" onClick={handleDropDown}>
              <TiArrowSortedDown className="drop-btn" />
              {isDropDownOpen && (
                <div className="dropdown-nav">
                  <button>
                    Settings <FiSettings className="dropdown-item-icon" />
                  </button>
                  <button className="sign-out-btn" onClick={handleSignOut}>
                    Sign out
                    <BiLogInCircle className="dropdown-item-icon" />{" "}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <RiMenu4Fill className="menuBtn" onClick={handleMenu} />
      </nav>
    );
}
 
export default Nav;