import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";
import ScrollTo from "../ScrollTo";
import defaultImage from "/img/hero.png";

function MainPostDetail() {
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // function getEvents() {
  //   axios
  //     .get(
  //       `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/${id}?_embed=1`
  //     )
  //     .then((response) => response.data)
  //     .then((data) => {
  //       setPost(data);
  //       setIsLoaded(true);
  //     })
  //     .catch((err) => console.log(err));
  // }

  function getEvents() {
    const getPost = axios.get(
      `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts/${id}?_embed=1`
    );

    const getComments = axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/wp-json/wp/v2/comments?post=${id}&order=asc`
    );

    Promise.all([getPost, getComments])
      .then((res) => {
        setPost(res[0].data);
        setComments(res[1].data);

        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getEvents();
  }, []);

  // console.log(post);
  // console.log(comments);

  if (isLoaded) {
    return (
      <div className="blog-detail">
        {post.featured_media !== 0 && (
          <div
            className="featured__image"
            style={{
              backgroundImage: `url(${post._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url})`,
            }}>
            <h3 className="blog-detail__title"> {post.title.rendered}</h3>
          </div>
        )}

        {post.featured_media === 0 && (
          <div
            className="featured__image"
            style={{
              backgroundImage: `url(${defaultImage})`,
            }}>
            <h3 className="blog-detail__title"> {post.title.rendered}</h3>
          </div>
        )}

        <div
          className="blog-detail__content"
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}></div>

        <button
          className="blog-detail__button"
          onClick={() => navigate(-1)}
          aria-label="Back">
          Back to articles
        </button>

        <Comments comments={comments} isLoaded={isLoaded} />

        <ScrollTo />
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

export default MainPostDetail;


