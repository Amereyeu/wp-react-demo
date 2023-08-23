import { useState } from "react";
import data from "../../data/images.json";
import Modal from "./Modal";

function ModalGallery() {
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(item);
    console.log("ci:", clickedImg);
  };


  const handelRotationRight = () => {
    const totalLength = data.data.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);

      const newUrl = data.data[0].link;
      setClickedImg(newUrl);
      return;
    }

    const newIndex = currentIndex + 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
    });

    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  const handelRotationLeft = () => {
    const totalLength = data.data.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);

      const newUrl = data.data[totalLength - 1].link;
      setClickedImg(newUrl);
      return;
    }

    const newIndex = currentIndex - 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
    });

    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="image-wrap">
      {data.data.map((item, index) => (
        <div
          key={index}
          className="image-box"
          onClick={() => handleClick(item, index)}>
          <img src={item.link} alt={item.text} className="image-box__image" />
          <h2 className="image-box__text">{item.text}</h2>
        </div>
      ))}

      <div>
        {clickedImg && (
          <Modal
            clickedImg={clickedImg}
            handelRotationRight={handelRotationRight}
            setClickedImg={setClickedImg}
            handelRotationLeft={handelRotationLeft}
          />
        )}
      </div>
    </div>
  );
}

export default ModalGallery;

