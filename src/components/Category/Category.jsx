import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import CategoryList from "./CategoryList";
import CategoryPost from "./CategoryPost";
import { SearchBar } from "../Search/Search";
import { GET_ALL_POSTS_FROM_CATEGORY } from "../../gql/queries";

function Category() {
  const { slug } = useParams();

  const { loading, error, data, fetchMore } = useQuery(
    GET_ALL_POSTS_FROM_CATEGORY,
    {
      variables: {
        id: slug,
        after: null,
      },
    }
  );

  console.log("category:", data);

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

  const categoryFound = Boolean(data?.category?.posts?.nodes.length);

  if (!categoryFound) {
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

        <CategoryList categories={data.categories} />

        <CategoryPost data={data} />

        {data.category.posts.pageInfo.hasNextPage === true && (
          <button
            className="load-more__button"
            onClick={() => {
              const { endCursor } = data.category.posts.pageInfo;

              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.category.posts.nodes = [
                    ...prevResult.category.posts.nodes,
                    ...fetchMoreResult.category.posts.nodes,
                  ];
                  return fetchMoreResult;
                },
              });
            }}>
            <a>Load more posts</a>
          </button>
        )}
      </div>
    </div>
  );
}

export default Category;

