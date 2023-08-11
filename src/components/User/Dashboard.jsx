import { useContext } from "react";
import AppContext from "../Context/AppContext";
import DashboardNavigation from "./DashboardNavigation";
import DashboardHeader from "./DashboardHeader";
import Posts from "./Posts/Posts";

function Dashboard() {
  const [store] = useContext(AppContext);

  return (
    <div className="dashboard-wrap">
      <div className="dashboard">
        <DashboardHeader store={store} />

        <DashboardNavigation />

        <Posts />
      </div>
    </div>
  );
}

export default Dashboard;

