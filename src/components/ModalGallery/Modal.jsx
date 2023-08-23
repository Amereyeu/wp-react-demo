import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

const Modal = ({
  clickedImg,
  setClickedImg,
  // handelRotationRight,
  // handelRotationLeft,
}) => {
  const handleClick = (e) => {
    if (e.target.classList.contains("dismiss")) {
      setClickedImg(null);
    }
  };

  return (
    <div className="modal-overlay dismiss" onClick={handleClick}>
      <div className="modal ">
        <div className="modal__close dismiss" onClick={handleClick}>
          <FaTimes />
        </div>

        <div className="modal__inner">
          <img
            src={clickedImg.link}
            // src={clickedImg}
            alt="img"
            className="modal__inner__image"
          />
          <div>
            <h2 className="modal__inner__title">{clickedImg.title}</h2>
            <p className="modal__inner__text">{clickedImg.text}</p>
          </div>
        </div>

        {/* <FaArrowLeft
          onClick={handelRotationLeft}
          className="modal__arrow-left"
        />

        <FaArrowRight
          onClick={handelRotationRight}
          className="modal__arrow-right"
        /> */}
      </div>
    </div>
  );
};

export default Modal;

