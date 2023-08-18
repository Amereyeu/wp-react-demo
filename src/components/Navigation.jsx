import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiSun, GiMoon } from "react-icons/gi";

function Navigation({ handleThemeChange, theme }) {
  const [isShrunk, setShrunk] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

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
          <Link
            to="/"
            className={`navigation__menu__item ${isShrunk ? "small" : ""}`}
            onClick={toggleNavigation}>
            <button aria-label="Home">Home</button>
          </Link>

          <Link
            to="/gallery"
            className={`navigation__menu__item ${isShrunk ? "small" : ""}`}
            onClick={toggleNavigation}>
            <button aria-label="Gallery">Gallery</button>
          </Link>

          <Link
            to="/contact"
            className={`navigation__menu__item ${isShrunk ? "small" : ""}`}
            onClick={toggleNavigation}>
            <button aria-label="Contact">Contact</button>
          </Link>

          <div
            className={`navigation__menu__item ${isShrunk ? "small" : ""}`}
            onClick={toggleNavigation}>
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
