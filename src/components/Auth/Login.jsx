import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { FiAlertTriangle, FiCheck } from "react-icons/fi";
import AppContext from "../Context/AppContext";

function Login() {
  const [store, setStore] = useContext(AppContext);

  const [loginFields, setLoginFields] = useState({
    username: "",
    password: "",
    userNiceName: "",
    message: "",
    loading: false,
  });

  function onSubmit(e) {
    e.preventDefault();

    const loginData = {
      username: loginFields.username,
      password: loginFields.password,
    };

    setLoginFields({ ...loginFields, loading: true });

    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/wp-json/jwt-auth/v1/token`,
        loginData
      )
      .then((response) => {
        if (undefined === response.data.token) {
          setLoginFields({
            ...loginFields,
            message: err.response.data.message,
            loading: false,
          });

          return;
        }

        const { token, user_nicename } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userName", user_nicename);

        setStore({
          ...store,
          userName: user_nicename,
          token: token,
        });

        setLoginFields({
          ...loginFields,
          loading: false,
          token: token,
          userNiceName: user_nicename,
        });
      })
      .catch((err) => {
        setLoginFields({
          ...loginFields,
          message: err.response.data.message,
          loading: false,
        });
      });
  }

  console.log(store);

  const onChange = (e) => {
    setLoginFields({ ...loginFields, [e.target.name]: e.target.value });
  };

  const createMarkup = (data) => ({
    __html: data,
  });

  const { username, password, userNiceName, message, loading } = loginFields;

  if (store.token) {
    return <Navigate to={`/dashboard/${username}`} />;
  } else {
    return (
      <div className="post-wrap">
        <div className="posts">
          <div className="container">
            <form onSubmit={onSubmit}>
              <div className="login">
                {message ? (
                  <div
                    className={`alert ${
                      loggedIn ? "alert--success" : "alert--danger"
                    }`}>
                    <div className="alert__icon">
                      {loggedIn === "true" ? <FiCheck /> : <FiAlertTriangle />}
                    </div>
                    <div
                      className="alert__message"
                      dangerouslySetInnerHTML={createMarkup(message)}></div>
                  </div>
                ) : (
                  ""
                )}

                <div className="login__input">
                  <input
                    placeholder="Username"
                    type="text"
                    name="username"
                    className="login__input__border"
                    value={username}
                    onChange={onChange}
                  />
                  <span className="bb"></span>
                </div>

                <div className="login__input">
                  <input
                    placeholder="Password"
                    type="Password"
                    name="password"
                    className="login__input__border"
                    value={password}
                    onChange={onChange}
                  />
                  <span className="bb"></span>
                </div>

                <div className="login__button">
                  <button className="login__button__send" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>

            {loading && (
              <div className="loading__placeholder">
                <div className="circle"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

