import { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function CreatePost() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPostCreated, setIsPostCreated] = useState(false);

  const initialValues = {
    title: "",
    content: "",
    featured_image: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    content: Yup.string().required(),
    featured_image: Yup.mixed().required(),
  });

  function onSubmit(data) {
    const authToken = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("featured_img", data.featured_image);

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setIsPostCreated(!!response.data.id);
        setIsLoaded(true);

        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  }

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
                      name="title"
                      placeholder="title"
                      type="text"
                      className="login__input__border"
                    />

                    <div className="error">
                      <ErrorMessage name="title" component="span" />
                    </div>
                  </div>

                  <div className="login__input">
                    <Field
                      name="content"
                      placeholder="content"
                      type="text"
                      className="login__input__border"
                    />

                    <div className="error">
                      <ErrorMessage name="content" component="span" />
                    </div>
                  </div>

                  <div className="login__input">
                    <Field
                      type="file"
                      name="featured_image"
                      className="login__input__border"
                    />

                    <div className="error">
                      <ErrorMessage name="featured_image" component="span" />
                    </div>
                  </div>

                  <div className="login__button">
                    <button className="login__button__send" type="submit">
                      Create Post
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

