import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import Comments from "./Comments";
import defaultImage from "/img/hero.png";
import { FaRegComments, FaRegClock, FaRegUser } from "react-icons/fa";
import { format } from "date-fns";
import { HashLink } from "react-router-hash-link";
import { GET_POST_BY_SLUG } from "../../gql/queries";

function MainPostDetail({ lg }) {
  const { slug } = useParams();

  const { loading, error, data } = useQuery(GET_POST_BY_SLUG, {
    variables: {
      id: slug,
      language: lg,
    },
  });

  const postFound = Boolean(data?.post);

  console.log(data);

  // console.log("comments:", data?.post.comments.nodes);

  return (
    <>
      {loading ? (
        <div className="post-wrap">
          <div className="posts__placeholder">
            <div className="circle"></div>
          </div>
        </div>
      ) : error ? (
        <div className="post-wrap">
          <div className="posts__placeholder">
            <div>
              <p>Error loading posts!</p>
            </div>
          </div>
        </div>
      ) : !postFound ? (
        <div className="post-wrap">
          <div className="posts__placeholder">
            <div>
              <p>Post could not be found!</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="detail">
          <div
            className="detail__featured-image"
            style={{
              backgroundImage:
                data.post.featuredImage === null
                  ? `url(${defaultImage})`
                  : `url(${data.post.featuredImage.node.sourceUrl})`,
            }}>
            <h3 className="detail__featured-image__title">{data.post.title}</h3>
          </div>

          <div className="detail__info">
            <div className="detail__info__left">
              {/* <img
                className="detail__info__left__image"
                src={data.post.author.node.avatar.url}
                alt={data.post.author.node.name}
              /> */}

              <div className="detail__info__left__author">
                <FaRegUser />
                <span>{data.post.author.node.name}</span>
              </div>

              <div className="detail__info__left__date">
                <FaRegClock />
                <span>{format(new Date(data.post.date), "dd.MM.yyyy")}</span>
              </div>

              <div className="detail__info__left__comments">
                <FaRegComments /> <span>Comments: </span>
                {/* <span>{data.post.comments.nodes.length}</span> */}
              </div>
            </div>

            <div className="detail__info__right">
              {data.post.categories.edges.length !== 0 && (
                <div className="detail__info__right__category">
                  <ul>
                    {data.post.categories.edges.map((cat) => (
                      <li key={cat.node.id}>
                        <Link
                          className="detail__info__right__category__pill"
                          to={`/category/${cat.node.slug}`}>
                          {cat.node.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div
            className="detail__content"
            dangerouslySetInnerHTML={{
              __html: data.post.content,
            }}></div>

          <button
            className="detail__button"
            // onClick={() => navigate(-1)}
            aria-label="Back to articles">
            <HashLink smooth to="/#posts">
              Back to articles
            </HashLink>
          </button>

          {/* {data?.post.comments.nodes.length !== 0 && ( */}
            <Comments comments={data?.post.comments.edges} />
          {/* )} */}
        </div>
      )}
    </>
  );
}

export default MainPostDetail;


