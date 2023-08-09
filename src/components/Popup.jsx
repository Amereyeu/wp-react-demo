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

  const [popupIsShown, setPopupIsShown] = useState(
    JSON.parse(localStorage.getItem("popupIsShown")) || "1"
  );

  const closeModal = () => {
    setOpen(false);
    setPopupIsShown("0");
  };

  useEffect(() => {
    localStorage.setItem("popupIsShown", JSON.stringify(popupIsShown));
  }, [popupIsShown]);



  if (isLoaded) {
    // popup modal
    return (
      <>
        {single.acf.page_visible === "yes" && popupIsShown === "1" && (
          <Popup open={open} onClose={closeModal}>
            <div className="modal">
              <div className="modal__close" onClick={closeModal}>
                &times;
              </div>

              <div
                className={`modal__info ${
                  single.acf.image === null ? "modal__info--full" : ""
                }`}>
                <div className="modal__info__icon">
                  {single.acf.image !== null && (
                    <img
                      src={single.acf.image.sizes.medium}
                      alt="image"
                      width="150"
                      height="150"
                    />
                  )}
                </div>

                <div
                  className="modal__info__text"
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

