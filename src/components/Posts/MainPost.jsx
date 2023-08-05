import { Link } from "react-router-dom";

function MainPost({ posts, isLoaded }) {
  if (isLoaded) {
    return (
      <>
        {posts.map((post) => (
          <div
            className="post"
            key={post.id}
          >
            <div className="post__image">
              <img
                src={
                  post._embedded["wp:featuredmedia"][0].media_details.sizes
                    .medium.source_url
                }
                alt={post._embedded["wp:featuredmedia"][0].title.rendered}
              />
            </div>

            <div className="post__text">
              <h3 className="post__text__title">
                <Link to={`/post/${post.id}`}>{post.title.rendered}</Link>
              </h3>

              <div className="row">
                <h4 className="post__text__author">
                  {post._embedded.author[0].name}
                </h4>

                <div className="category">
                  <ul>
                    {post._embedded["wp:term"][0].map((cat) => (
                      <li key={cat.id}>
                        <Link
                          className="category__pill"
                          to={`/category/${cat.id}`}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered,
                }}
              ></div>

              <div className="tag">
                <ul>
                  <li>tags:</li>
                  {post._embedded["wp:term"][1].map((tag) => (
                    <li key={tag.id}>
                      <Link className="tag__pill" to={`/tag/${tag.id}`}>
                        {tag.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return null;
}

export default MainPost;

