import React from "react";
import CreatePost from "./CreatePost";

function Dashboard() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="post-wrap">
      <div className="posts">
        <div>Welcome </div>

        <CreatePost />

        <button className="navigation__menu__item" onClick={handleLogout}>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

