import Hero from "../components/Hero";
import Post from "./Post";
import About from "./About";
import CustomPost from "./CustomPost";
import Newsletter from "../components/Newsletter";
import ModalGallery from "../components/ModalGallery/ModalGallery";

function Home() {
  return (
    <main>
      <Hero />

      <Post />

      <About />

      <Newsletter />

      <ModalGallery />

      <CustomPost />
    </main>
  );
}

export default Home;

