import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GallerySingle({ gallery }) {
  const [media, setMedia] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  function getEvents() {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/media/${
          gallery.featured_media
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
        <Link to={`/cake/${gallery.id}`}>
          <figcaption>
            <h2> {gallery.title.rendered}</h2>
          </figcaption>
        </Link>
      </figure>
    );
  }

  return null;
}

export default GallerySingle;



