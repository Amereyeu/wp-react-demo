import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_PAGE } from "../gql/queries";

function About() {
  const { loading, error, data } = useQuery(GET_SINGLE_PAGE, {
    variables: {
      // language: lg,
    },
  });

  if (loading) {
    return (
      <div className="posts__placeholder">
        <div className="circle"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-wrap">
        <div className="posts__placeholder">
          <div>
            <p>Error loading page!</p>
          </div>
        </div>
      </div>
    );
  }

  const pageFound = Boolean(data?.pages?.nodes.length);

  if (!pageFound) {
    return (
      <div className="post-wrap">
        <div className="posts__placeholder">
          <div>
            <p>Page not found!</p>
          </div>
        </div>
      </div>
    );
  }

  console.log("page:", data);

  // single page
  return (
    <>
      {data.pages.nodes[0].acfpages.pageVisible === "yes" && (
        <div className="about">
          <picture className="about__image">
            {/* <source srcSet="./img/06.jpg" media="(min-width: 769px)" /> */}
            <img
              src={data.pages.nodes[0].acfpages.image.sourceUrl}
              alt="image"
              width="360"
              height="448"
            />
          </picture>

          <div className="about__text">
            <h2>{data.pages.nodes[0].title}</h2>

            <div
              dangerouslySetInnerHTML={{
                __html: data.pages.nodes[0].content,
              }}></div>
          </div>
        </div>
      )}
    </>
  );
}

export default About;

