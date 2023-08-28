import Hero from "../components/Hero";
import Post from "./Post";
import About from "./About";
import Newsletter from "../components/Newsletter";
import ModalGallery from "../components/ModalGallery/ModalGallery";
import CustomPost from "./CustomPost";

function Home({ lg }) {
  return (
    <main>
      <Hero />

      <Post lg={lg} />

      <About lg={lg} />

      <Newsletter lg={lg} />

      <ModalGallery />

      <CustomPost lg={lg} />
    </main>
  );
}

export default Home;

