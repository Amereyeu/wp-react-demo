import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SearchBar } from "../Search/Search";
import TagList from "./TagList";
import TagPost from "./TagPost";
import { GET_ALL_POSTS_FROM_TAG } from "../../gql/queries";

function Tags() {
  const { slug } = useParams();

  const { loading, error, data, fetchMore } = useQuery(GET_ALL_POSTS_FROM_TAG, {
    variables: {
      id: slug,
      after: null,
    },
  });

  console.log("tag:", data);

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

  const tagFound = Boolean(data?.tag?.posts?.nodes.length);

  if (!tagFound) {
    return (
      <div className="post-wrap">
        <div className="posts__placeholder">
          <div>
            <p>No posts found!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-wrap">
      <div className="posts">
        <SearchBar />

        <TagList tags={data.tags} />

        <TagPost data={data} />

        {/* {data.tag.posts.pageInfo.hasNextPage === true && (
          <button
            className="load-more__button"
            onClick={() => {
              const { endCursor } = data.tag.posts.pageInfo;

              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.tag.posts.nodes = [
                    ...prevResult.tag.posts.nodes,
                    ...fetchMoreResult.tag.posts.nodes,
                  ];
                  return fetchMoreResult;
                },
              });
            }}>
            <a>Load more posts</a>
          </button>
        )} */}
      </div>
    </div>
  );
}

export default Tags;

