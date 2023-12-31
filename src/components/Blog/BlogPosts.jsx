import { useState, useEffect } from "react";
import axios from "axios";
import BlogPost from "./BlogPost";
import Pagination from "../Pagination";
import CategoryList from "../Category/CategoryList";

function BlogPosts() {
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
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);

  const previousPage = () => setCurrentPage(currentPage - 1);

  if (isLoaded) {
    return (
      <div className="blog">
        <CategoryList categories={categories} />

        <BlogPost posts={currentPosts} isLoaded={isLoaded} />

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
    <div className="blog__placeholder">
      <div className="circle"></div>
    </div>
  );
}

export default BlogPosts;

