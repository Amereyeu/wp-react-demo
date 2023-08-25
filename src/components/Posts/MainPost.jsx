import { Link } from "react-router-dom";
import { FaRegComments, FaRegClock, FaRegUser } from "react-icons/fa";
import { format } from "date-fns";

function MainPost({ data }) {
  return (
    <>
      {data.posts.nodes.map((post, id) => (
        <div
          className={`post ${post.featuredImage === null ? "post--full" : ""}`}
          key={post.id}>
          {post.featuredImage !== null && (
            <div className="post__image">
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.title}
                width="300"
                height="225"
              />
            </div>
          )}

          <div className="post__text">
            <h2 className="post__text__title">
              <Link to={`/post/${post.slug}`}>{post.title}</Link>
            </h2>

            <div className="row">
              <div className="detail__info__left">
                <div className="detail__info__left__author">
                  <FaRegUser />
                  <span>{post.author.node.name}</span>
                </div>

                <div className="detail__info__left__date">
                  <FaRegClock />
                  <span>{format(new Date(post.date), "dd.MM.yyyy")}</span>
                </div>

                <div className="detail__info__left__comments">
                  <FaRegComments /> <span>Comments: </span>
                  <span>{post.comments.nodes.length}</span>
                </div>
              </div>

              {post.categories.edges.length !== 0 && (
                <div className="post__text__category">
                  <ul>
                    {post.categories.edges.map((cat) => (
                      <li key={cat.node.id}>
                        <Link
                          className="post__text__category__pill"
                          to={`/category/${cat.node.id}`}>
                          {cat.node.name}
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
                __html: post.excerpt,
              }}></div>

            {post.tags.edges.length !== 0 && (
              <div className="post__text__tag">
                <ul>
                  <li>tags:</li>
                  {post.tags.edges.map((tag) => (
                    <li key={tag.node.id}>
                      <Link
                        className="post__text__tag__pill"
                        to={`/tag/${tag.node.id}`}>
                        {tag.node.name}
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

export default MainPost;


