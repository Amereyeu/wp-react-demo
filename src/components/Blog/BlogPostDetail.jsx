import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ScrollTo from "../ScrollTo";

function BlogPostDetail() {
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

  useEffect(() => {
    getEvents();
  }, []);

 // console.log(post);

  if (isLoaded) {
    return (
      <div className="blog-detail">
        <div
          className="featured__image"
          style={{
            backgroundImage: `url(${post._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url})`,
          }}
        >
          <h3 className="blog-detail__title"> {post.title.rendered}</h3>
        </div>

        <div
          className="blog-detail__content"
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        ></div>

        <button onClick={() => navigate(-1)}>Zpět na blog</button>

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

export default BlogPostDetail;

