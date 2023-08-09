import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FiAlertTriangle, FiCheck } from "react-icons/fi";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/wp-json/jwt-auth/v1/token`,
        loginData
      )
      .then((response) => {
        if (undefined === response.data.token) {
          setIsLoaded(true);
          return;
        }

        const { token } = response.data;

        localStorage.setItem("token", token);

        setLoggedIn(true);
        setIsLoaded(true);

        console.log(response.data);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  }

  // console.log(token);

  const createMarkup = (data) => ({
    __html: data,
  });

  if (loggedIn || localStorage.getItem("token")) {
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
                    onChange={(e) => setUsername(e.currentTarget.value)}
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
                    onChange={(e) => setPassword(e.currentTarget.value)}
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
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

