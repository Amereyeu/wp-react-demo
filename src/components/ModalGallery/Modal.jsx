import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const Modal = ({
  clickedImg,
  setClickedImg,
  handelRotationRight,
  handelRotationLeft,
}) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("dismiss")) {
      setClickedImg(null);
    }
  };

  return (
    <>
      <div className="modal-overlay dismiss" onClick={handleClick}>
        <div className="modal">
          <div className="modal__close dismiss" onClick={handleClick}>
            <FaTimes />
          </div>

          <img src={clickedImg} alt="img" />

          <div onClick={handelRotationLeft} className="overlay-arrows_left">
            <div>
              <FaArrowLeft />
            </div>
          </div>

          <div onClick={handelRotationRight} className="overlay-arrows_right">
            <div>
              <FaArrowRight />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;







