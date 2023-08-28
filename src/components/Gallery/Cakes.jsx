import { useState, useEffect } from "react";
import axios from "axios";
import Cake from "./Cake";
import CakeSkeleton from "./CakeSkeleton";

function Cakes() {
  const [cakes, setCakes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function getEvents() {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/photos`)
      .then((response) => response.data)
      .then((data) => {
        setCakes(data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getEvents();
  }, []);

  console.log("cakes:", cakes);

  if (isLoaded) {
    return (
      <div className="gallery" id="gallery">
        {cakes.map((cake) => (
          <Cake key={cake.id} cake={cake} />
        ))}
      </div>
    );
  }

  return (
    <div className="gallery" id="gallery">
      <CakeSkeleton cards={8} />
    </div>
  );
}

export default Cakes;

