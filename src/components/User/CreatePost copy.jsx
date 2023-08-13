import { useState, useRef } from "react";
import axios from "axios";
import { FiAlertTriangle, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Select from "react-select";


function CreatePost() {
  const [inputField, setInputField] = useState({
    title: "",
    content: "",
  });

  const [categories, setCategories] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    const formData = {
      title: inputField.title,
      content: inputField.content,
      categories: categories.value,
      status: "publish",
    };

    const authToken = localStorage.getItem("token");

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setMessage(response.data.id ? "New post created" : "");
        setIsPostCreated(!!response.data.id);

        setInputField({
          ...inputField,
          title: "",
          // featured_media: "",
          content: "",
        });

        setIsLoaded(true);
        // console.log(response.data);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  }

  const inputsHandler = (e) => {
    setInputField((inputField) => ({
      ...inputField,
      [e.target.name]: e.target.value,
    }));
  };

  const createMarkup = (data) => ({
    __html: data,
  });

  console.log(categories.value);

  return (
    <div className="post-wrap">
      <div className="posts">
        <div className="container">
          <form onSubmit={onSubmit}>
            <div className="login">
              {message ? (
                <div
                  className={`alert ${
                    isPostCreated ? "alert--success" : "alert--danger"
                  }`}>
                  <div className="alert__icon">
                    {isPostCreated ? <FiCheck /> : <FiAlertTriangle />}
                  </div>
                  <div
                    className="alert__message"
                    dangerouslySetInnerHTML={createMarkup(message)}></div>
                </div>
              ) : (
                ""
              )}

              <div className="login__input">
                <label htmlFor="post-title">Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={inputsHandler}
                  value={inputField.title}
                  className="form-control"
                  id="post-title"
                />
              </div>

              <div className="login__input">
                <label htmlFor="post-content">Content</label>
                <textarea
                  name="content"
                  className="form-control"
                  id="post-content"
                  onChange={inputsHandler}
                  value={inputField.content}
                  rows="10"
                />
              </div>

              <h2>Select your categories</h2>
              <Select
                onChange={(selectedValue) => setCategories(selectedValue)}
                isMulti
                isSearchable
                options={[
                  { value: "1", label: "windows" },
                  { value: "6", label: "pc" },
                  { value: "7", label: "tech" },
                  { value: "8", label: "linux" },
                  { value: "9", label: "macos" },
                  { value: "10", label: "misc" },
                ]}
                className="basic"></Select>

              <div className="login__button">
                <button className="login__button__send" type="submit">
                  Create Post
                </button>
              </div>
            </div>
          </form>

          {isPostCreated ? (
            <button
              className="back__button"
              onClick={() => navigate(-1)}
              aria-label="Back to articles">
              Back to dashboard
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

