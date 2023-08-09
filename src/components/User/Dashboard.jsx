import React from "react";

function Dashboard({ username }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="post-wrap">
      <div className="posts">
        <div>Welcome {username}</div>

        <button className="navigation__menu__item" onClick={handleLogout}>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

