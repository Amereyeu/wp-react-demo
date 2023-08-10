import { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import DashboardNavigation from "./DashboardNavigation";
import DashboardHeader from "./DashboardHeader";

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
    <div className="dashboard-wrap">
      <div className="dashboard">
        <DashboardHeader store={store} handleLogout={handleLogout} />

        <DashboardNavigation />
      </div>
    </div>
  );
}

export default Dashboard;

