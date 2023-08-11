import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";

const AppProvider = (props) => {
  const [store, setStore] = useState({
    userName: "",
    token: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const email = localStorage.getItem("email");

    setStore({ ...store, token, userName, email });
  }, []);

  // console.log(store);

  return (
    <AppContext.Provider value={[store, setStore]}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;

