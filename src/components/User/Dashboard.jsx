import React from "react";
import CreatePost from "./CreatePost";
import { getUserName } from "../Auth/Token";

function Dashboard() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

const userName = getUserName() ? getUserName() : "";

  return (
    <>
      <div className="post-wrap">
        <div className="posts">
          <div>{userName ? <h2>Welcome {userName}!!</h2> : ""}</div>
        </div>
      </div>

      <CreatePost />

      <button className="navigation__menu__item" onClick={handleLogout}>
        <span>Logout</span>
      </button>
    </>
  );
}

export default Dashboard;





