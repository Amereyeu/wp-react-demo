import MainPosts from "../components/Posts/MainPosts";

function Post({ lg }) {
  return (
    <div className="post-wrap"id="posts">
      <MainPosts lg={lg} />
    </div>
  );
}

export default Post;

