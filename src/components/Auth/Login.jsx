import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
      .catch((err) => console.log(err.response.data.message));
  }

  if (loggedIn || localStorage.getItem("token")) {
    return <Navigate to={`/dashboard/${username}`} />;
  } else {
    return (
      <div className="post-wrap">
        <div className="posts">
          <div className="container">
            <form onSubmit={onSubmit}>
              <div className="">
                <div className="contact__input__wrap">
                  <input
                    placeholder="Username"
                    type="text"
                    name="username"
                    className="border1"
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                  />
                  <span className="bb"></span>
                </div>

                <div className="contact__input__wrap">
                  <input
                    placeholder="Password"
                    type="Password"
                    name="password"
                    className="border1"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                  <span className="bb"></span>
                </div>

                <div className="contact__button">
                  <button className="contact__button__send" type="submit">
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

