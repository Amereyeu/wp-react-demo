import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiSun, GiMoon } from "react-icons/gi";

import data from "../nav.json";

function Navigation({ handleThemeChange, theme }) {
  const [isShrunk, setShrunk] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navigationData] = useState(data);

  const toggleNavigation = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const onScroll = () => {
      setShrunk((isShrunk) => {
        if (
          !isShrunk &&
          (document.body.scrollTop > 200 ||
            document.documentElement.scrollTop > 200)
        ) {
          return true;
        }

        if (
          isShrunk &&
          document.body.scrollTop < 4 &&
          document.documentElement.scrollTop < 4
        ) {
          return false;
        }

        return isShrunk;
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          {navigationData.map((navItem, i) => (
            <Link
              to={navItem.to}
              key={i}
              className={`navigation__menu__item ${isShrunk ? "small" : ""}`}
              onClick={toggleNavigation}>
              <button aria-label={navItem.name}>{navItem.name}</button>
            </Link>
          ))}

          <div className="switch-wrap" onClick={toggleNavigation}>
            <div
              onClick={handleThemeChange}
              aria-label="Theme Switch"
              className={`switch ${isShrunk ? "small" : ""}`}>
              {theme === "light" ? <GiMoon /> : <GiSun />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
