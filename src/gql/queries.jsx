import { gql } from "@apollo/client";


// main post page
const GET_ALL_POSTS = gql`
  query getAllPosts {
    # query getAllPosts($after: String) {
    # posts(first: 5, after: $after) {
    posts(first: 100) {
      nodes {
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
          }
        }
        excerpt
        content
        date
        link
        tags {
          edges {
            node {
              slug
              id
              name
            }
          }
        }
        categories {
          edges {
            node {
              slug
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
    categories {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

// main post - detail page
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
      comments(where: { orderby: COMMENT_DATE }) {
        nodes {
          id
          author {
            node {
              id
              name
              avatar {
                url
              }
            }
          }
          content
          replies {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export { GET_ALL_POSTS, GET_POST_BY_SLUG };


