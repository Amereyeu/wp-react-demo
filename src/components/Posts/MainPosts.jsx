import { useState, useEffect, useRef } from "react";
import axios from "axios";
import MainPost from "./MainPost";
import Pagination from "../Pagination";
import CategoryList from "../Category/CategoryList";
import { SearchBar } from "../Search/Search";

function MainPosts() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  function getEvents() {
    const getPosts = axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/wp-json/wp/v2/posts?_embed=1&per_page=99`
    );

    const getCategories = axios.get(
      `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/categories`
    );

    Promise.all([getPosts, getCategories])
      .then((res) => {
        setPosts(res[0].data);
        setCategories(res[1].data);

        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  // console.log("posts:", posts);

  useEffect(() => {
    getEvents();

    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    const href = window.location.href.substring(
      window.location.href.lastIndexOf("#") + 1
    );
    if (window.location.href.lastIndexOf("#") > 0) {
      document.getElementById(href)?.scrollIntoView();
    }
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const previousPage = () => setCurrentPage(currentPage - 1);
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);

  if (isLoaded) {
    return (
      <div className="posts">
        <SearchBar />

        <CategoryList categories={categories} />

        <MainPost posts={currentPosts} isLoaded={isLoaded} />

        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          nextPage={nextPage}
          previousPage={previousPage}
          currentPage={currentPage}
          firstPage={firstPage}
          lastPage={lastPage}
          totalPages={totalPages}
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

export default MainPosts;

