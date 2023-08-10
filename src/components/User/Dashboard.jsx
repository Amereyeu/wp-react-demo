import { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import DashboardNavigation from "./DashboardNavigation";

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
      <div className="dashboard-wrap">
        <div className="dashboard">
          <div className="dashboard__header">
            <div className="dashboard__header__left">
              {store.userName ? (
                <h2 className="dashboard__header__left__user">
                  Welcome {store.userName}
                </h2>
              ) : (
                ""
              )}
            </div>

            <div className="dashboard__header__right">
              <button
                className="dashboard__header__right__logout"
                onClick={handleLogout}>
                <span>Logout</span>
              </button>
            </div>
          </div>
          <div className="dashboard__navigation">
            <DashboardNavigation />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

