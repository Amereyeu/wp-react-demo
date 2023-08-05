import { Link } from "react-router-dom";

function CustomPost({ posts, isLoaded }) {
  if (isLoaded) {
    return (
      <>
        <ol className="custom-list">
          {posts.map((post) => (
            <li className="custom-list__item" key={post.id}>
              <h3>{post.title.rendered}</h3>

              <div
                dangerouslySetInnerHTML={{
                  __html: post.content.rendered,
                }}></div>
            </li>
          ))}
        </ol>
      </>
    );
  }

  return null;
}

export default CustomPost;

