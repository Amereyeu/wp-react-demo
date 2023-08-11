import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import Pagination from "../../Pagination";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";

function Posts() {
  const [store] = useContext(AppContext);

  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  function getEvents() {
    axios
      .get(
        `${
          import.meta.env.VITE_BASE_URL
        }/wp-json/wp/v2/posts?_embed=1&per_page=99`
      )
      .then((response) => response.data)
      .then((data) => {
        setPosts(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  console.log("dashboard posts:", posts);

  useEffect(() => {
    getEvents();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const previousPage = () => setCurrentPage(currentPage - 1);

  if (isLoaded) {
    return (
      <div className="posts">
        <Post posts={currentPosts} isLoaded={isLoaded} store={store} />

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          nextPage={nextPage}
          previousPage={previousPage}
          currentPage={currentPage}
        />
      </div>
    );
  }

  return (
    <div className="posts__placeholder">
      <div className="circle"></div>
    </div>
  );
}

export default Posts;

