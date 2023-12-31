import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../Pagination";
import CategoryList from "./CategoryList";
import MainPost from "../Posts/MainPost";
import { SearchBar } from "../Search/Search";

function Category() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const navigate = useNavigate();
  const { id } = useParams();

  function getEvents() {
    const getPosts = axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/wp-json/wp/v2/posts?_embed=1&categories=${id}`
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

  //console.log(posts);

  useEffect(() => {
    getEvents();
  }, [id]);

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
      <div className="post-wrap">
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
      </div>
    );
  }

  return (
    <div className="post-wrap">
      <div className="category__placeholder">
        <div className="circle"></div>
      </div>
    </div>
  );
}

export default Category;



