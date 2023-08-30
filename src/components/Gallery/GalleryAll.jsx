import { useState, useEffect } from "react";
import axios from "axios";
import GallerySingle from "./GallerySingle";
import GallerySkeleton from "./GallerySkeleton";

function GalleryAll() {
  const [gallery, setGallery] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function getEvents() {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/photos`)
      .then((response) => response.data)
      .then((data) => {
        setGallery(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getEvents();
  }, []);

  console.log("gallery:", gallery);

  if (isLoaded) {
    return (
      <div className="gallery" id="gallery">
        {gallery.map((galleryItem) => (
          <GallerySingle key={galleryItem.id} gallery={galleryItem} />
        ))}
      </div>
    );
  }

  return (
    <div className="gallery" id="gallery">
      <GallerySkeleton cards={8} />
    </div>
  );
}

export default GalleryAll;

