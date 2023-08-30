import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cake({ cake }) {
  const [media, setMedia] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  function getEvents() {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media/${
          cake.featured_media
        }`
      )
      .then((res) => {
        setMedia(res.data.media_details.sizes.full.source_url);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getEvents();
  }, []);

  if (isLoaded) {
    return (
      <figure
        className="gallery__item"
        style={{ backgroundImage: `url(${media})` }}>
        <Link to={`/cake/${cake.id}`}>
          <figcaption>
            <h2> {cake.title.rendered}</h2>
          </figcaption>
        </Link>
      </figure>
    );
  }

  return null;
}

export default Cake;

