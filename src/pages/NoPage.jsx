import React from "react";
import { Link } from "react-router-dom";


function NoPage() {
  return (
    <div className="notfound">
      <h1>Stránka nenalezena</h1>
      <Link to="/" className="notfound__link">
        Zpět na úvodní stránku
      </Link>
    </div>
  );
}

export default NoPage;


