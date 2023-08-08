import { useState, useEffect } from "react";
import axios from "axios";
import CategoryPost from "./Category/CategoryPost";
import Pagination from "./Pagination";
import { useNavigate, useParams } from "react-router-dom";

function Tags() {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const navigate = useNavigate();
  const { id } = useParams();

  function getEvents() {
    const getPosts = axios.get(
      `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/posts?_embed=1&tags=${id}`
    );

    Promise.all([getPosts])
      .then((res) => {
        setPosts(res[0].data);

        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  //console.log(posts);

  useEffect(() => {
    getEvents();
  }, [id]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const previousPage = () => setCurrentPage(currentPage - 1);

  if (isLoaded) {
    return (
      <div className="post-wrap">
        <div className="posts">
          <CategoryPost posts={currentPosts} isLoaded={isLoaded} />

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            nextPage={nextPage}
            previousPage={previousPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="post-wrap">
      <div className="posts__placeholder">
        <div className="circle"></div>
      </div>
    </div>
  );
}

export default Tags;

