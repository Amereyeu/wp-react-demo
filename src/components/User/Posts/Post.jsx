import { Link } from "react-router-dom";

function Post({ posts, isLoaded, store }) {
  if (isLoaded) {
    return (
      <>
          
            {posts.map((post) => (
        // {{post._embedded.author[0].name === 0 ? (
              <div className="dashboard__post" key={post.id}>
                <h2 className="dashboard__post__title">
                  <Link to={`/post/${post.id}`}>{post.title.rendered}</Link>
                </h2>

                <h3 className="dashboard__post__author">
                  {post._embedded.author[0].name}
                </h3>
              </div>
              // ) : (
              //   <h2>nothing</h2>
              // )}}
            ))}

      </>
    );
  }

  return null;
}

export default Post;


