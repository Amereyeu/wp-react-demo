import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select/creatable";
import makeAnimated from "react-select/animated";

function CreatePost() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategories, setNewCategories] = useState([]);

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTags, setNewTags] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isPostCreated, setIsPostCreated] = useState(false);

  const navigate = useNavigate();
  const imgUpload = useRef(null);

  function getEvents() {
    const getCategories = axios.get(
      `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/categories`
    );

    const getTags = axios.get(
      `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/tags`
    );

    Promise.all([getCategories, getTags])
      .then((res) => {
        setCategories(res[0].data);
        setTags(res[1].data);
      })
      .catch((err) => console.log(err));
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      featured_image: "",
      categories: [selectedCategories],
      tags: [selectedTags],
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .min(2, "At least 2 characters")
        .max(100, "No more than 100 characters"),
      content: Yup.string().required("Content cannot be empty"),
      // featured_image: Yup.mixed().required("Select a featured image"),
      category: Yup.mixed().required("Select at least one category"),
      // tag: Yup.object().required("Select at least one tag"),
    }),

    onSubmit: async (data) => {
      setLoading(true);

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
        categories: newCategories,
        tags: newTags,
      };

      if (featuredMediaId) {
        post.featured_media = featuredMediaId;
      }

      axios
        .post(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/`, post, {
          headers: headers,
        })
        .then((response) => {
          console.log("new post", response);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });

      setIsPostCreated(true);
      setLoading(false);
    },
  });

  const [img, setImg] = useState("");
  const isImageLoaded = useState(false);
  function previewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(imgUpload.current.files[0]);
    oFReader.onload = function (oFREvent) {
      setImg(oFREvent.target.result);
    };
  }

  const toggleImage = () => {
    setImg("");
  };

  const handleCategoryChange = (selectedOption, actionMeta) => {
    // console.log("handleChange", selectedOption, actionMeta);
    setSelectedCategories(selectedOption);
  };

  const handleTagChange = (selectedOption, actionMeta) => {
    // console.log("handleChange", selectedOption, actionMeta);
    setSelectedTags(selectedOption);
  };

  useEffect(() => {
    getEvents();

    const category_id = selectedCategories.map((cat) => {
      return cat.id;
    });

    setNewCategories(category_id);

    const tag_id = selectedTags.map((tag) => {
      return tag.id;
    });

    setNewTags(tag_id);
  }, [selectedCategories, selectedTags]);

  console.log(newTags);

  return (
    <div className="post-wrap">
      <div className="posts">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <div className="create">
              <div className="row">
                <div className="create__left">
                  {(() => {
                    if (img) {
                      return (
                        <img
                          src={img}
                          alt="image"
                          className="create__left__image"
                          onClick={toggleImage}
                        />
                      );
                    }
                  })()}

                  {(() => {
                    if (!img) {
                      return (
                        <div
                          className={`create__left__input ${
                            isImageLoaded ? "show" : ""
                          }`}>
                          <input
                            type="file"
                            name="featured_image"
                            ref={imgUpload}
                            // onChange={previewImage}
                            // value={formik.values.featured_image}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "featured_image",
                                e.target.files[0]
                              );
                              previewImage();
                            }}
                          />
                        </div>
                      );
                    }
                  })()}

                  <div className="create__left__select">
                    <label htmlFor="category">Category:</label>
                    <Select
                      components={makeAnimated()}
                      options={categories}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      onChange={handleCategoryChange}
                      isMulti
                      name="category"
                    />
                    {<formik className=""></formik> &&
                      selectedCategories.length === 0 &&
                      formik.errors.category && (
                        <span className="create__left__select__error">
                          {formik.errors.category}
                        </span>
                      )}
                  </div>

                  <div className="create__left__select">
                    <label htmlFor="category">Tag:</label>
                    <Select
                      components={makeAnimated()}
                      options={tags}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.id}
                      onChange={handleTagChange}
                      isMulti
                      name="tag"
                    />
                    {/* {<formik className=""></formik> &&
                      selectedTags.length === 0 &&
                      formik.errors.tag && (
                        <span className="create__left__select__error">
                          {formik.errors.tag}
                        </span>
                      )} */}
                  </div>
                </div>

                <div className="create__right">
                  <div className="create__right__input">
                    <input
                      type="text"
                      placeholder="Enter post title"
                      name="title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                    />
                    {<formik className=""></formik> && formik.errors.title && (
                      <span className="create__right__input__error">
                        {formik.errors.title}
                      </span>
                    )}
                  </div>

                  <div className="create__right__input">
                    <textarea
                      name="content"
                      placeholder="Enter post content"
                      onChange={formik.handleChange}
                      value={formik.values.content}
                      rows={10}></textarea>
                  </div>
                  {<formik className=""></formik> && formik.errors.content && (
                    <span className="create__right__input__error">
                      {formik.errors.content}
                    </span>
                  )}
                </div>
              </div>

              <div className="row">
                {loading ? (
                  <div className="loading__placeholder">
                    <div className="circle"></div>
                  </div>
                ) : (
                  <div className="create__button">
                    <button className="create__button__send" type="submit">
                      Create Post
                    </button>
                  </div>
                )}
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




