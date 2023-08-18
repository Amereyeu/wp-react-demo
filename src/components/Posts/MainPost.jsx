import { Link } from "react-router-dom";
import { FaRegComments, FaRegClock } from "react-icons/fa";


function MainPost({ posts, comments, isLoaded }) {
  if (isLoaded) {
    return (
      <>
        {posts.map((post) => (
          <div
            className={`post ${post.featured_media === 0 ? "post--full" : ""}`}
            key={post.id}>
            {post.featured_media !== 0 && (
              <div className="post__image">
                <img
                  src={
                    post._embedded["wp:featuredmedia"][0].media_details.sizes
                      .medium.source_url
                  }
                  alt={post._embedded["wp:featuredmedia"][0].title.rendered}
                  width="300"
                  height="225"
                />
              </div>
            )}

            <div className="post__text">
              <h2 className="post__text__title">
                <Link to={`/post/${post.id}`}>{post.title.rendered}</Link>
              </h2>

              <div className="row">
                <h3 className="post__text__author">
                  {post._embedded.author[0].name}
                </h3>
                
                <div className="detail__info__left">
                  <img
                    className="detail__info__left__image"
                    src={post._embedded.author[0].avatar_urls["24"]}
                    alt={post._embedded.author[0].name}
                  />

                  <div className="detail__info__left__author">
                    {post._embedded.author[0].name}
                  </div>

                  <div className="detail__info__left__date">
                    <FaRegClock /> {post.date.slice(0, 10)}
                  </div>

                  <div className="detail__info__left__comments">
                    <FaRegComments /> <span>Comments: </span> {comments.length}
                  </div>
                </div>



                {post.categories.length !== 0 && (
                  <div className="post__text__category">
                    <ul>
                      {post._embedded["wp:term"][0].map((cat) => (
                        <li key={cat.id}>
                          <Link
                            className="post__text__category__pill"
                            to={`/category/${cat.id}`}>
                            {cat.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div
                className="post__text__excerpt"
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered,
                }}></div>

              {post.categories.length !== 0 && (
                <div className="post__text__tag">
                  <ul>
                    <li>tags:</li>
                    {post._embedded["wp:term"][1].map((tag) => (
                      <li key={tag.id}>
                        <Link
                          className="post__text__tag__pill"
                          to={`/tag/${tag.id}`}>
                          {tag.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </>
    );
  }

  return null;
}

export default MainPost;



