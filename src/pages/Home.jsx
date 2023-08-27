import { useState, useEffect } from "react";

import Hero from "../components/Hero";
import Post from "./Post";
import About from "./About";
import Newsletter from "../components/Newsletter";
import ModalGallery from "../components/ModalGallery/ModalGallery";
import CustomPost from "./CustomPost";

function Home({ lg }) {
  // const [lg, setlg] = useState("EN");



  console.log("l:", lg);

  return (
    <main>
      <Hero />

      {/* <button onClick={() => setlg("EN")}>EN</button>
      <button onClick={() => setlg("CS")}>CS</button> */}

      <Post lg={lg} />

      <About lg={lg} />

      <Newsletter lg={lg} />

      <ModalGallery />

      <CustomPost lg={lg} />
    </main>
  );
}

export default Home;


