import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FaWordpressSimple, FaReact } from "react-icons/fa";

const ControlledPopup = () => {
  const [single, setSingle] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function getEvents() {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/pages`)
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

  const [open, setOpen] = useState(true);

  const closeModal = () => {
    setOpen(false);
  };

  if (isLoaded) {
    // popup modal
    return (
      <>
        {single[0].acf.page_visible === "yes" && (
          <Popup open={open} onClose={closeModal}>
            <div className="modal">
              <a className="close" onClick={closeModal}>
                &times;
              </a>

              <div className="info-modal">
                <div className="info-modal__icon">
                  <FaWordpressSimple />
                  <FaReact />
                </div>
                <div
                  className="info-modal__text"
                  dangerouslySetInnerHTML={{
                    __html: single[0].content.rendered,
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

