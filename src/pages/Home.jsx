import Cakes from "../components/Gallery/Cakes";
import Hero from "../components/Hero";

import About from "./About";
import CustomPost from "./CustomPost";
import News from "./News";
import Post from "./Post";


function Home() {
  return (
    <main>
      <Hero />
      <Post />
      <About />
      <CustomPost />
      {/* <News /> */}
      {/* <Cakes /> */} 
      
    </main>
  );
}

export default Home;

