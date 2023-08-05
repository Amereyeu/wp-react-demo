import { FaWordpressSimple, FaReact } from "react-icons/fa";
function Footer() {
  const today = new Date();

  return (
    <footer className="footer">
      <div className="footer__logo">
        <FaWordpressSimple className="footer__logo__icon" />
        <FaReact className="footer__logo__icon" />
      </div>
      
      <div className="footer__copyright">
        <p>Copyright &copy;2018 - {today.getFullYear()} WP-React Demo</p>
      </div>
    </footer>
  );
}

export default Footer;

