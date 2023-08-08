import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const ControlledPopup = () => {
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

  // console.log(single);

  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
  };

  if (isLoaded) {
    // popup modal
    return (
      <>
        {single.acf.page_visible === "yes" && (
          <Popup open={open} onClose={closeModal}>
            <div className="modal">
              <div className="close" onClick={closeModal}>
                &times;
              </div>

              <div
                className={`info-modal ${
                  single.acf.image === null ? "info-modal--full" : ""
                }`}>
                <div className="info-modal__icon">
                  {single.acf.image !== null && (
                    <img src={single.acf.image.sizes.medium} alt="image" />
                  )}
                </div>

                <div
                  className="info-modal__text"
                  dangerouslySetInnerHTML={{
                    __html: single.content.rendered,
                  }}></div>
              </div>
            </div>
          </Popup>
        )}
      </>
    );
  }

  return null;
};

export default ControlledPopup;

