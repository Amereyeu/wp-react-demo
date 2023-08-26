import { gql } from "@apollo/client";

// show all posts on the post page
const GET_ALL_POSTS = gql`
  query getAllPosts($language: LanguageCodeFilterEnum!) {
    posts(first: 100, where: { language: $language }) {
      nodes {
        language {
          code
          locale
          slug
          name
          id
        }
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

// single post - detail page
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
            slug
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

//filter posts by category
const GET_ALL_POSTS_FROM_CATEGORY = gql`
  query getPostsFromCategory($after: String, $id: ID!) {
    category(id: $id, idType: SLUG) {
      name
      id
      posts(first: 5, after: $after) {
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
        pageInfo {
          endCursor
          hasNextPage
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

//filter posts by tag
const GET_ALL_POSTS_FROM_TAG = gql`
  query getPostsFromTag($after: String, $id: ID!) {
    tag(id: $id, idType: SLUG) {
      name
      id
      posts(first: 5, after: $after) {
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
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
    tags {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;

// show all custom posts on the page
const GET_ALL_CUSTOM_POSTS = gql`
  query getAllCustomPosts($language: LanguageCodeFilterEnum!) {
    customPosts(first: 3, where: { language: $language }) {
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
      }
    }
  }
`;

// show single page
const GET_SINGLE_PAGE = gql`
  query singlePage {
    pages(where: { id: 21 }) {
      nodes {
        id
        title
        content
        acfpages {
          pageVisible
          image {
            sourceUrl
          }
        }
      }
    }
  }
`;

export {
  GET_ALL_POSTS,
  GET_POST_BY_SLUG,
  GET_ALL_POSTS_FROM_CATEGORY,
  GET_ALL_POSTS_FROM_TAG,
  GET_ALL_CUSTOM_POSTS,
  GET_SINGLE_PAGE,
};

