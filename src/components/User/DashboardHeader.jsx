

function DashboardHeader({ store, handleLogout }) {
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
        <button
          className="dashboard__header__right__logout"
          onClick={handleLogout}>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader

