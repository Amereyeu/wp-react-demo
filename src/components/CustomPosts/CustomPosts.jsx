import { useQuery } from "@apollo/client";
import CustomPost from "./CustomPost";
import { GET_ALL_CUSTOM_POSTS } from "../../gql/queries";

function CustomPosts({ lg }) {
  const { loading, error, data } = useQuery(GET_ALL_CUSTOM_POSTS, {
    variables: {
      language: lg,
    },
  });

  if (loading) {
    return (
      <div className="post-wrap">
        <div className="posts__placeholder">
          <div className="circle"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-wrap">
        <div className="posts__placeholder">
          <div>
            <p>Error loading posts!</p>
          </div>
        </div>
      </div>
    );
  }

  const customPostsFound = Boolean(data?.customPosts.nodes.length);

  if (!customPostsFound) {
    return (
      <div className="post-wrap">
        <div className="posts__placeholder">
          <div>
            <p>No posts found.</p>
          </div>
        </div>
      </div>
    );
  }

  // console.log("customPosts:", data);

  return <CustomPost data={data} />;
}

export default CustomPosts;

