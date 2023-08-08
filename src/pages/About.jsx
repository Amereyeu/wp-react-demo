import { useState, useEffect } from "react";
import axios from "axios";

function About() {
  const [single, setSingle] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function getEvents() {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/pages/21`)
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
    // single page
    return (
      <>
        {single.acf.page_visible === "yes" && (
          <div className="about">
            <picture className="about__image">
              {/* <source srcSet="./img/06.jpg" media="(min-width: 769px)" /> */}
              <img
                src={single.acf.image.url}
                alt="image"
                width="360"
                height="448"
              />
            </picture>

            <div className="about__text">
              <h2>{single.title.rendered}</h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: single.content.rendered,
                }}></div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default About;


