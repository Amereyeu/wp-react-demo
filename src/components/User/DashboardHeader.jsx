import Logout from "../Auth/Logout";

function DashboardHeader({ store }) {
  return (
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
        <Logout />
      </div>
    </div>
  );
}

export default DashboardHeader;

