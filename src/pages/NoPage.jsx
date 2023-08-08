import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div className="notfound">
      <h1>Page not found</h1>
      <Link to="/" className="notfound__link">
        Back to homepage
      </Link>
    </div>
  );
}

export default NoPage;

