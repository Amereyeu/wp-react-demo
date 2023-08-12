import React, { useState, useRef } from "react";
import axios from "axios";

function ImageUpload({ itemid }) {
  const imgUpload = useRef(null);
  const [img, setImg] = useState("");

  function updateItem() {
    if (imgUpload.current.files.length > 0) {
      var formData = new FormData();
      let file = imgUpload.current.files[0];
      formData.append("file", file);
      formData.append("title", file.name);
      formData.append("post", itemid); //coming from props
      let headers = {};
      headers["Content-Disposition"] =
        "form-data; filename='" + file.name + "'";
      headers["X-WP-Nonce"] = "your nonce here...";
      axios
        .post("/wp-json/wp/v2/media/?featured=" + itemid, formData, headers)
        .then(function (resp) {
          getItems(); //callback to parent's this.getItems(),
        });
    }
  }

  function previewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(imgUpload.current.files[0]);
    oFReader.onload = function (oFREvent) {
      setImg(oFREvent.target.result);
    };
  }

  return (
    <div>
      {(() => {
        if (img) {
          return <img src={img} alt="image" width={100} height={100} />;
        }
      })()}
      <input
        id="imgUpload"
        type="file"
        ref={imgUpload}
        onChange={previewImage}
      />
      <button onClick={updateItem}>Update</button>
    </div>
  );
}

export default ImageUpload;

