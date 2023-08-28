import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";

function CakeDetail() {
  const [cake, setCake] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  function getEvents() {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/photos/${id}`)
      .then((response) => response.data)
      .then((data) => {
        setCake(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getEvents();
  }, []);

  // console.log("cake:", cake);

  if (isLoaded) {
    return (
      <div className="detail">
        <h3 className="detail__title"> {cake.title.rendered}</h3>

        {cake.acf.image !== null && (
          <ImageGallery
            autoPlay={true}
            items={cake.acf.image_gallery.map((img) => ({
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

export default CakeDetail;

