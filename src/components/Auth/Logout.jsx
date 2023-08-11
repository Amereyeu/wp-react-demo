import { useContext, useState } from "react";

import AppContext from "../Context/AppContext";

function Logout() {
  const [store, setStore] = useContext(AppContext);

  const [loginFields, setLoginFields] = useState({
    loading: false,
  });

  const handleLogout = () => {
    setLoginFields({ ...loginFields, loading: true });

    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    setStore({
      ...store,
      token: "",
      userName: "",
      loading: false,
    });

    window.location.href = "/";
  };

  const { loading } = loginFields;

  console.log(store);

  return (
    <>
     
      {!loading && (
        <button
          className="dashboard__header__right__logout"
          onClick={handleLogout}>
          <span>Logout</span>
        </button>
      )}
      
      {loading && (
        <div className="loading__placeholder">
          <div className="circle"></div>
        </div>
      )}
    </>
  );
}

export default Logout;



