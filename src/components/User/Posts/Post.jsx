import { Link } from "react-router-dom";

function Post({ posts }) {
  if (posts.length) {
    return (
      <>
        {posts.map((post) => (
          <div className="dashboard__post" key={post.id}>
            <h2 className="dashboard__post__title">{post.title.rendered}</h2>

            <div className="dashboard__post__actions">
              <button className="dashboard__post__actions__edit dashboard__post__actions--blue">
                Edit
              </button>

              <Link to={`/dashboard/delete-post/${post.id}`}>
                <button
                  className="dashboard__post__actions__delete dashboard__post__actions--red"
                  // onClick={(e) => onDelete(post.id)}
                >
                  Delete
                </button>
              </Link>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="posts__placeholder">
      <div className="circle"></div>
    </div>
  );
}

export default Post;

