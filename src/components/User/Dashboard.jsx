import { useContext, useEffect } from "react";
import CreatePost from "./CreatePost";
import AppContext from "../Context/AppContext";

function Dashboard() {
  const [store, setStore] = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    setStore({
      ...store,
      token: "",
      userName: "",
    });

    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    setStore({ ...store, token, userName });

    console.log("stored item:", store);
  }, []);

  return (
    <>
      <div className="post-wrap">
        <div className="posts">
          <div>{store.userName ? <h2>Welcome {store.userName}!!</h2> : ""}</div>
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


