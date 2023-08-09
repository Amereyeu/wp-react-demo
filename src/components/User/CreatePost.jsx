import { useState } from "react";
import axios from "axios";
import { FiAlertTriangle, FiCheck } from "react-icons/fi";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [message, setMessage] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    const formData = {
      title: title,
      content: content,
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
        setTitle("");
        setContent("");
        setIsLoaded(true);
        // console.log(response.data);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  }

  const createMarkup = (data) => ({
    __html: data,
  });

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
                  onChange={(e) => setTitle(e.currentTarget.value)}
                  value={title}
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
                  onChange={(e) => setContent(e.currentTarget.value)}
                  value={content}
                  rows="10"
                />
              </div>

              <div className="login__button">
                <button className="login__button__send" type="submit">
                  Create Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

