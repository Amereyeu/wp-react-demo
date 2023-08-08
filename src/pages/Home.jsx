import Hero from "../components/Hero";
import Post from "./Post";
import About from "./About";
import CustomPost from "./CustomPost";

function Home() {
  return (
    <main>
      <Hero />
      <Post />
      <About />
      <CustomPost />
    </main>
  );
}

export default Home;

