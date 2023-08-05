import React, { useState } from "react";
import Agens from "../data.json";

function Alergens() {
  const [data] = useState(Agens);

  return (
    <>
      <div className="alergens__header">
        <h3>{data.header.title}</h3>
        <p>{data.header.text}</p>
      </div>

      <div className="alergens">
        {data.alergens.map((alergen, i) => (
          <div className="card" key={i}>
            <div className="card__text">
              <h2>{alergen.name}</h2>
              <p>{alergen.text}</p>
            </div>
            <div className="card__image">
              <img src={alergen.image} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Alergens;

