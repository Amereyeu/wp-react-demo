import {
  FaWordpressSimple,
  FaReact,
  FaBehance,
  FaCodepen,
  FaGithub,
  FaRegEnvelope,
} from "react-icons/fa";

function Footer() {
  const today = new Date();

  return (
    <footer className="footer">
      <div className="footer__logo">
        <FaWordpressSimple className="footer__logo__icon" />
        <FaReact className="footer__logo__icon" />
      </div>

      <div className="footer__social">
        <ul>
          <li>
            <a
              href="https://www.behance.net/amrey"
              className="navigation__menu__item"
              target="_blank">
              <FaBehance />
            </a>
          </li>

          <li>
            <a
              href="https://codepen.io/Amerey"
              className="navigation__menu__item"
              target="_blank">
              <FaCodepen />
            </a>
          </li>

          <li>
            <a
              href="https://github.com/Amereyeu"
              className="navigation__menu__item"
              target="_blank">
              <FaGithub />
            </a>
          </li>

          <li>
            <a
              href="mailto:info@amerey.eu"
              className="navigation__menu__item"
              target="_blank">
              <FaRegEnvelope />
            </a>
          </li>
        </ul>
      </div>

      <div className="footer__copyright">
        <p>Copyright &copy;2018 - {today.getFullYear()} WP-React Demo</p>
      </div>
    </footer>
  );
}

export default Footer;

