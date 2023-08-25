function CustomPost({ posts }) {
  return (
    <>
      <ol className="custom-list">
        {posts.customPosts.nodes.map((post, id) => (
          <li className="custom-list__item" key={post.id}>
            <h3>{post.title}</h3>

            <div
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}></div>
          </li>
        ))}
      </ol>
    </>
  );
}

export default CustomPost;

