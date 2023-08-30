import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";

function GalleryDetail() {
  const [gallery, setGallery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  function getEvents() {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/photos/${id}`)
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

  // console.log("one gallery:", gallery);
  

  if (isLoaded) {
    return (
      <div className="detail">
        <h3 className="detail__title"> {gallery.title.rendered}</h3>

        {gallery.acf.image !== null && (
          <ImageGallery
            autoPlay={true}
            items={gallery.acf.image_gallery.map((img) => ({
              original: img.full_image_url,
              thumbnail: img.thumbnail_image_url,
            }))}
          />
        )}

        {/* <button onClick={() => navigate("/")}>Go home</button> */}
      </div>
    );
  }

  return (
    <div className="posts__placeholder">
      <div className="circle"></div>
    </div>
  );
}

export default GalleryDetail;



