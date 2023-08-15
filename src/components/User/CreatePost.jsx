import { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [isPostCreated, setIsPostCreated] = useState(false);
  const navigate = useNavigate();
  const imgUpload = useRef(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      featured_image: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required(),
      content: Yup.string().required(),
      featured_image: Yup.mixed().required(),
    }),

    onSubmit: async (data) => {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let featuredMediaId = 0;

      if (data.featured_image) {
        const formData = new FormData();
        formData.append("file", data.featured_image);

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media/`,
          formData,
          {
            headers: headers,
            "Content-Type": "multipart/form-data",
          }
        );

        featuredMediaId = response.data.id;
      }

      const post = {
        title: data.title,
        content: data.content,
        status: "publish",
      };

      if (featuredMediaId) {
        post.featured_media = featuredMediaId;
      }

      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/`,
          post,
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log("res", response);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });

      setIsPostCreated(true);
    },
  });

  const [img, setImg] = useState("");
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
          <form onSubmit={formik.handleSubmit}>
            <div className="login">
              <div className="login__input">
                <input
                  className="login__input__border"
                  type="text"
                  placeholder="Enter post title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                />
              </div>

              <div className="login__input">
                <textarea
                  className="login__input__border"
                  name="content"
                  placeholder="Enter post content"
                  onChange={formik.handleChange}
                  value={formik.values.content}></textarea>
              </div>

              <div className="login__input">
                {(() => {
                  if (img) {
                    return (
                      <img src={img} alt="image" width={100} height={100} />
                    );
                  }
                })()}

                <input
                  className="login__input__border"
                  type="file"
                  name="featured_image"
                  ref={imgUpload}
                  // onChange={previewImage}
                  // value={formik.values.featured_image}
                  onChange={(e) => {
                    formik.setFieldValue("featured_image", e.target.files[0]);
                    previewImage();
                  }}
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

