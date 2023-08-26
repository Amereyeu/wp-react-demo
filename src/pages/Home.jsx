import { useState, useEffect } from "react";

import Hero from "../components/Hero";
import Post from "./Post";
import About from "./About";
import Newsletter from "../components/Newsletter";
import ModalGallery from "../components/ModalGallery/ModalGallery";
import CustomPost from "./CustomPost";

function Home() {
  const [lg, setlg] = useState("EN");

  // const lang = document
  //   .querySelector("html")
  //   .getAttribute("lang")
  //   .toUpperCase();

  console.log("l:", lg);

  return (
    <main>
      <Hero />

      <button onClick={() => setlg("EN")}>EN</button>
      <button onClick={() => setlg("CS")}>CS</button>

      <Post lg={lg} />

      <About />

      <Newsletter />

      <ModalGallery />

      <CustomPost lg={lg} />
    </main>
  );
}

export default Home;

