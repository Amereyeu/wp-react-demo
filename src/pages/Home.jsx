import Hero from "../components/Hero";
import Post from "./Post";
import About from "./About";
import CustomPost from "./CustomPost";
import Newsletter from "../components/Newsletter";

function Home() {
  return (
    <main>
      <Hero />
     
        <Post />
     
      <About />
      <Newsletter />
      <CustomPost />
    </main>
  );
}

export default Home;

