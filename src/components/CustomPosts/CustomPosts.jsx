import { useState, useEffect } from "react";
import axios from "axios";
import CustomPost from "./CustomPost";

function CustomPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  function getEvents() {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/wp-json/wp/v2/custom_posts`)
      .then((res) => {
        setPosts(res.data);

        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getEvents();
  }, []);

  const currentPosts = posts.slice(0, 3);

  if (isLoaded) {
    return <CustomPost posts={currentPosts} isLoaded={isLoaded} />;
  }

  return (
    <div className="blog__placeholder">
      <div className="circle"></div>
    </div>
  );
}

export default CustomPosts;

