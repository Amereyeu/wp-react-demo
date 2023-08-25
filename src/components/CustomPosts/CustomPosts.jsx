import { useState, useEffect } from "react";

import CustomPost from "./CustomPost";
import { gql, useQuery } from "@apollo/client";

const GET_ALL_CUSTOM_POSTS = gql`
  query getAllCustomPosts {
    customPosts(first: 3) {
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
      }
    }
  }
`;

function CustomPosts() {
  // const [posts, setPosts] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);

  // function getEvents() {
  //   axios
  //     .get(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/custom_posts`)
  //     .then((res) => {
  //       setPosts(res.data);

  //       setIsLoaded(true);
  //     })
  //     .catch((err) => console.log(err));
  // }

  // useEffect(() => {
  //   getEvents();
  // }, []);

  // const currentPosts = posts.slice(0, 3);

  // if (isLoaded) {
  //   return <CustomPost posts={currentPosts} isLoaded={isLoaded} />;
  // }

  // return (
  //   <div className="blog__placeholder">
  //     <div className="circle"></div>
  //   </div>
  // );

  const { loading, error, data } = useQuery(GET_ALL_CUSTOM_POSTS);

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

  const customPostsFound = Boolean(data?.customPosts.nodes.length);

  if (!customPostsFound) {
    return (
      <div className="posts__placeholder">
        <div>No posts found!</div>
      </div>
    );
  }

  console.log("customPosts:", data);

  return <CustomPost posts={data} />;
}

export default CustomPosts;

