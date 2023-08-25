import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Comments from "./Comments";
import defaultImage from "/img/hero.png";
import { FaRegComments, FaRegClock, FaRegUser } from "react-icons/fa";
import { format } from "date-fns";
import { HashLink } from "react-router-hash-link";
import { gql, useQuery } from "@apollo/client";

const GET_POST_BY_SLUG = gql`
  query getPostBySlug($id: ID!) {
    post(id: $id, idType: SLUG) {
      id
      slug
      title
      featuredImage {
        node {
          id
          sourceUrl
          altText
          title
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      excerpt
      content
      date
      link
      tags {
        edges {
          node {
            id
            name
          }
        }
      }
      categories {
        edges {
          node {
            id
            name
          }
        }
      }
      comments {
        nodes {
          author {
            node {
              id
              name
            }
          }
          content
        }
      }
    }
  }
`;

function MainPostDetail() {
  const { slug } = useParams();

  const { loading, error, data } = useQuery(GET_POST_BY_SLUG, {
    variables: {
      id: slug,
    },
  });

  const postFound = Boolean(data?.post);

  console.log(data);

  return (
    <>
      {loading ? (
        <div className="posts__placeholder">
          <div className="circle"></div>
        </div>
      ) : error ? (
        <div className="posts__placeholder">
          <div>Error: {error.message}</div>
        </div>
      ) : !postFound ? (
        <div className="posts__placeholder">
          <div>Post could not be found.</div>
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
                <span>{data.post.comments.nodes.length}</span>
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
                          to={`/category/${cat.node.id}`}>
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

          {/* <Comments comments={comments} isLoaded={isLoaded} /> */}
        </div>
      )}
    </>
  );
}

export default MainPostDetail;

