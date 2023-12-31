import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Comments from "./Comments";
import defaultImage from "/img/hero.png";
import { FaRegComments, FaRegClock, FaRegUser } from "react-icons/fa";
import { format } from "date-fns";
import { HashLink } from "react-router-hash-link";

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
      <div className="detail">
        <div
          className="detail__featured-image"
          style={{
            backgroundImage:
              post.featured_media === 0
                ? `url(${defaultImage})`
                : `url(${post._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url})`,
          }}>
          <h3 className="detail__featured-image__title">
            {post.title.rendered}
          </h3>
        </div>

        <div className="detail__info">
          <div className="detail__info__left">
            {/* <img
              className="detail__info__left__image"
              src={post._embedded.author[0].avatar_urls["24"]}
              alt={post._embedded.author[0].name}
            /> */}

            <div className="detail__info__left__author">
              <FaRegUser />
              <span>{post._embedded.author[0].name}</span>
            </div>

            <div className="detail__info__left__date">
              <FaRegClock />
              <span>{format(new Date(post.date), "dd.MM.yyyy")}</span>
            </div>

            <div className="detail__info__left__comments">
              <FaRegComments /> <span>Comments: </span>
              <span>{comments.length}</span>
            </div>
          </div>

          <div className="detail__info__right">
            {post.categories.length !== 0 && (
              <div className="detail__info__right__category">
                <ul>
                  <li>
                    <span>Categories:</span>
                  </li>
                  {post._embedded["wp:term"][0].map((cat) => (
                    <li key={cat.id}>
                      <Link
                        className="detail__info__right__category__pill"
                        to={`/category/${cat.id}`}>
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div
          className="detail__content"
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}></div>

        <button
          className="detail__button"
          // onClick={() => navigate(-1)}
          aria-label="Back to articles">
          <HashLink smooth to="/#posts">
            Back to articles
          </HashLink>
        </button>

        <Comments comments={comments} isLoaded={isLoaded} />
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

