import { useState, useRef } from "react";
import axios from "axios";
import { FiAlertTriangle, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import FileUploader from "./FileUploader";

function CreatePost() {
  const [inputField, setInputField] = useState({
    title: "",
    content: "",
    // featured_media: "",
  });

  const imgUpload = useRef(null);
  const [img, setImg] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    const formData = {
      title: inputField.title,
      content: inputField.content,
      // featured_media: inputField.featured_media,
      status: "publish",
    };
  // formData.append("name", name);
  // formData.append("file", selectedFile);

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

    // if (imgUpload.current.files.length > 0) {
    //   var formData2 = new FormData();
    //   let file = imgUpload.current.files[0];
    //   formData2.append("file", file);
    //   formData2.append("title", file.name);
    //   formData2.append("post", itemid); //coming from props
    //   let headers = {};
    //   headers["Content-Disposition"] =
    //     "form-data; filename='" + file.name + "'";
    //   headers["X-WP-Nonce"] = "your nonce here...";
    //   axios
    //     .post("/wp-json/wp/v2/media/?featured=" + itemid, formData, headers)
    //     .then(function (resp) {
    //       getItems(); //callback to parent's this.getItems(),
    //     });
    // }
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

  function updateItem() {
    if (imgUpload.current.files.length > 0) {
      var formData = new FormData();
      let file = imgUpload.current.files[0];
      formData.append("file", file);
      formData.append("title", file.name);
      formData.append("post", itemid); //coming from props
      let headers = {};
      headers["Content-Disposition"] =
        "form-data; filename='" + file.name + "'";
      headers["X-WP-Nonce"] = "your nonce here...";
      axios
        .post("/wp-json/wp/v2/media/?featured=" + itemid, formData, headers)
        .then(function (resp) {
          getItems(); //callback to parent's this.getItems(),
        });
    }
  }

  function previewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(imgUpload.current.files[0]);
    oFReader.onload = function (oFREvent) {
      setImg(oFREvent.target.result);
    };
  }

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

              {/* <div>
                {(() => {
                  if (img) {
                    return (
                      <img src={img} alt="image" width={100} height={100} />
                    );
                  }
                })()}
                <input
                  id="imgUpload"
                  type="file"
                  ref={imgUpload}
                  onChange={previewImage}
                />
                <button onClick={updateItem}>Update</button>
              </div> */}

              <FileUploader
                onFileSelectSuccess={(file) => setSelectedFile(file)}
                onFileSelectError={({ error }) => alert(error)}
              />

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

              {/* <div className="login__input">
                <label htmlFor="post-image">Featured Image</label>
                <input
                  type="text"
                  name="featured_image"
                  onChange={inputsHandler}
                  value={inputField.featured_media}
                  className="form-control"
                  id="post-image"
                />
              </div> */}

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



