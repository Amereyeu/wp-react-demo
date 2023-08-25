import { useState, useEffect, useRef } from "react";
import MainPost from "./MainPost";
import Pagination from "../Pagination";
import CategoryList from "../Category/CategoryList";
import { SearchBar } from "../Search/Search";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_POSTS = gql`
  query getAllPosts {
    posts(first: 5) {
      nodes {
        id
        slug
        title
        featuredImage {
          node {
            id
            sourceUrl
            altText
            title
          }
        }
        author {
          node {
            name
          }
        }
        excerpt
        content
        date
        link
        tags {
          edges {
            node {
              id
              name
            }
          }
        }
        categories {
          edges {
            node {
              id
              name
            }
          }
        }
        comments {
          nodes {
            author {
              node {
                id
                name
              }
            }
            content
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

function MainPosts() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) {
    return (
      <div className="posts__placeholder">
        <div className="circle"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts__placeholder">
        <div>Error loading posts!</div>
      </div>
    );
  }

  const postsFound = Boolean(data?.posts.nodes.length);

  if (!postsFound) {
    return (
      <div className="posts__placeholder">
        <div>No posts found!</div>
      </div>
    );
  }

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;
  //   const href = window.location.href.substring(
  //     window.location.href.lastIndexOf("#") + 1
  //   );
  //   if (window.location.href.lastIndexOf("#") > 0) {
  //     document.getElementById(href)?.scrollIntoView();
  //   }
  // }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(data.posts.nodes.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => setCurrentPage(currentPage + 1);
  const previousPage = () => setCurrentPage(currentPage - 1);
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);

  // if (isLoaded) {
  //   return (
  //     <div className="posts">
  //       <SearchBar />

  //       <CategoryList categories={categories} />

  //       {/* <MainPost posts={currentPosts} isLoaded={isLoaded} /> */}

  //       <Pagination
  //         postsPerPage={postsPerPage}
  //         totalPosts={posts.length}
  //         paginate={paginate}
  //         nextPage={nextPage}
  //         previousPage={previousPage}
  //         currentPage={currentPage}
  //         firstPage={firstPage}
  //         lastPage={lastPage}
  //         totalPages={totalPages}
  //       />
  //     </div>
  //   );
  // }

  console.log("mainPosts:",data);

  return (
    <div className="posts">
      <SearchBar />

      <CategoryList categories={categories} />

      {data.posts.nodes.map((post, id) => (
        <MainPost post={post} key={id} />
      ))}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data?.posts.nodes.length}
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

export default MainPosts;


