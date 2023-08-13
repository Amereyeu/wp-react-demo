import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/AppContext";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

function Login() {
  const [store, setStore] = useContext(AppContext);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is required"),
    username: Yup.string().required("Username is required"),
  });

  const [loading, setLoading] = useState(false);

  function onSubmit(values) {
    setLoading(true);

    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/wp-json/jwt-auth/v1/token`,
        values
      )
      .then((response) => {
        if (undefined === response.data.token) {
          setLoading(false);

          return;
        }

        const { token, user_display_name, user_email } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userName", user_display_name);
        localStorage.setItem("email", user_email);

        // console.log(response.data);

        setStore({
          ...store,
          userName: user_display_name,
          token: token,
          loggedIn: true,
          email: user_email,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }

  // console.log(store);

  if (store.token) {
    return <Navigate to={`/dashboard/${store.userName}`} />;
  } else {
    return (
      <div className="post-wrap">
        <div className="posts">
          <div className="container">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>
              {() => (
                <Form>
                  <div className="login">
                    <div className="login__input">
                      <Field
                        name="username"
                        placeholder="Username"
                        type="text"
                        className="login__input__border"
                      />
                      <span className="bb"></span>
                      <div className="error">
                        <ErrorMessage name="username" component="span" />
                      </div>
                    </div>

                    <div className="login__input">
                      <Field
                        name="password"
                        placeholder="Password"
                        type="password"
                        className="login__input__border"
                      />
                      <span className="bb"></span>
                      <div className="error">
                        <ErrorMessage name="password" component="span" />
                      </div>
                    </div>

                    {loading ? (
                      <div className="loading__placeholder">
                        <div className="circle"></div>
                      </div>
                    ) : (
                      <div className="login__button">
                        <button className="login__button__send" type="submit">
                          Login
                        </button>
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

