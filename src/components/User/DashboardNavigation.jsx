import { Link } from "react-router-dom";

function DashboardNavigation() {
  return (
    <ul>
      <li>
        <Link
          to="/dashboard/create-post"
          className={`dashboard__navigation__item ${
            "/dashboard/create-post" === window.location.pathname
              ? "active"
              : ""
          }`}>
          Create New Post
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/create-post"
          className={`dashboard__navigation__item ${
            "/dashboard/create-post" === window.location.pathname
              ? "active"
              : ""
          }`}>
          Edit Post
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard/create-post"
          className={`dashboard__navigation__item ${
            "/dashboard/create-post" === window.location.pathname
              ? "active"
              : ""
          }`}>
          Delete Post
        </Link>
      </li>
    </ul>
  );
}

export default DashboardNavigation;

