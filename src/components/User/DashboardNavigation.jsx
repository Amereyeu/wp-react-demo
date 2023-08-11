import { Link } from "react-router-dom";

function DashboardNavigation() {
  return (
    <div className="dashboard__navigation">
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
      </ul>
    </div>
  );
}

export default DashboardNavigation;

