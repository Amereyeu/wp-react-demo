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
            <button>Home</button>
          </Link>

          <Link
            to="/gallery"
            className="navigation__menu__item"
            onClick={toggleNavigation}>
            <button>Gallery</button>
          </Link>

          <Link
            to="/alergens"
            className="navigation__menu__item"
            onClick={toggleNavigation}>
            <button>Alergeny</button>
          </Link>

          <Link
            to="/contact"
            className="navigation__menu__item"
            onClick={toggleNavigation}>
            <button>Contact</button>
          </Link>

          <Link
            to="/blog"
            className="navigation__menu__item"
            onClick={toggleNavigation}>
            <button>Blog</button>
          </Link>

          <div className="navigation__menu__item" onClick={toggleNavigation}>
            <button onClick={handleThemeChange}>
              {theme === "white" ? <GiMoon /> : <GiSun />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
