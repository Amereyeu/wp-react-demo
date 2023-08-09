import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiSun, GiMoon } from "react-icons/gi";

function Navigation({ handleThemeChange, theme }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavigation = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="navigation-container">
      <div className="navigation">
        <div
          className={`navigation__toggle ${isNavOpen ? "open" : ""}`}
          onClick={toggleNavigation}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navigation__menu ${isNavOpen ? "collapse" : ""}`}>
          <Link
            to="/"
            className="navigation__menu__item"
            onClick={toggleNavigation}>
            <button aria-label="Home">Home</button>
          </Link>

          <Link
            to="/gallery"
            className="navigation__menu__item"
            onClick={toggleNavigation}>
            <button aria-label="Gallery">Gallery</button>
          </Link>

          <Link
            to="/contact"
            className="navigation__menu__item"
            onClick={toggleNavigation}>
            <button aria-label="Contact">Contact</button>
          </Link>
          
          <Link
            to="/login"
            className="navigation__menu__item"
            onClick={toggleNavigation}>
            <button aria-label="Login">Login</button>
          </Link>

          <div className="navigation__menu__item" onClick={toggleNavigation}>
            <button onClick={handleThemeChange} aria-label="Theme Switch">
              {theme === "light" ? <GiMoon /> : <GiSun />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
