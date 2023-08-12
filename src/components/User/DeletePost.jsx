import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import defaultImage from "/img/hero.png";

function DeletePost() {
  const [post, setPost] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  function getEvents() {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/${id}?_embed=1`
      )
      .then((response) => response.data)
      .then((data) => {
        setPost(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  console.log(post);

  useEffect(() => {
    getEvents();
  }, []);

  const onDelete = (id) => {
    const confirm = window.confirm("Are you sure?");

    if (confirm) {
      const authToken = localStorage.getItem("token");

      axios
        .delete(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          navigate(-1);
        })
        .catch((err) => console.log(err));
    }
  };

  if (isLoaded) {
    return (
      <div className="post-wrap">
        <div className="posts">
          <div className="container">
            <div className="delete">
              <div className="delete__row">
                <div
                  className="delete__row__featured-image"
                  style={{
                    backgroundImage:
                      post.featured_media === 0
                        ? `url(${defaultImage})`
                        : `url(${post._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url})`,
                  }}></div>

                <div className="delete__row__right">
                  <h2 className="delete__row__right__title">
                    {post.title.rendered}
                  </h2>

                  <div
                    className="delete__row__right__excerpt"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered,
                    }}></div>

                  <div className="delete__buttons">
                    <button
                      className="delete__buttons__delete delete__buttons__delete--red"
                      onClick={(e) => onDelete(post.id)}
                      aria-label="Delete">
                      Delete
                    </button>

                    <button
                      className="delete__buttons__back"
                      onClick={() => navigate(-1)}
                      aria-label="Back to articles">
                      Back to dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-wrap">
      <div className="blog__placeholder">
        <div className="circle"></div>
      </div>
    </div>
  );
}

export default DeletePost;

