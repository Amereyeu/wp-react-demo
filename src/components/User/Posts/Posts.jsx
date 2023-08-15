import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import Pagination from "../../Pagination";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";

function Posts() {
  const [store, setStore] = useContext(AppContext);

  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const [filteredPosts, setFilteredPosts] = useState([]);

  const getEvents = () => {
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
  };

  const fp = posts.filter((post) => {
    return post._embedded.author[0].name === store.userName;
  });

  if (isLoaded) {
    setFilteredPosts(fp);
    setIsLoaded(false);
  }

  // console.log("fp:", fp);
  // console.log("filtered posts:", filteredPosts);
  // console.log("dashboard posts:", posts);

  useEffect(() => {
    getEvents();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const previousPage = () => setCurrentPage(currentPage - 1);

  if (filteredPosts.length !== 0) {
    return (
      <div className="posts">
        <Post posts={currentPosts} />
        

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredPosts.length}
          paginate={paginate}
          nextPage={nextPage}
          previousPage={previousPage}
          currentPage={currentPage}
        />
      </div>
    );
  }

  return (
    <div className="dashboard__nopost">
      <h2 className="dashboard__nopost__title">No posts!</h2>
    </div>
  );
}

export default Posts;

