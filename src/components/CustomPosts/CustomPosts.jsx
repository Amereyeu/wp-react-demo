import { gql, useQuery } from "@apollo/client";
import CustomPost from "./CustomPost";

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

  // console.log("customPosts:", data);

  return <CustomPost data={data} />;
}

export default CustomPosts;

