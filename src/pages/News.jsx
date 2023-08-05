import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function News() {
  const [single, setSingle] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function getEvents() {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/pages/510`)
      .then((response) => response.data)
      .then((data) => {
        setSingle(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getEvents();
  }, []);

  if (isLoaded) {
    // telephone page
    return (
      <>
        {single.acf.page_visible === "yes" && (
          <div className="news">
            <div className="news__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g fill="#cd90de">
                  <path d="M15 17c-2 0-8-6-8-8 0-1 2-2 2-3S6 0 5 0 0 3 0 4c0 8 12 20 20 20 1 0 4-4 4-5s-5-4-6-4-2 2-3 2z"></path>
                </g>
              </svg>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: single.content.rendered }}
              className="news__text"
            ></div>
          </div>
        )}
      </>
    );
  }

  return (
    <div>
      <Skeleton />
    </div>
  );
}

export default News;

