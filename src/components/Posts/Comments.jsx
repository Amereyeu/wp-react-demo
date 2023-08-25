function Comments({ comments }) {
  return (
    <div className="comment">
      {comments?.nodes.map((comment) => (
        <div key={comment.id} className="comment__item">
          <div className="comment__item__left">
            <img
              src={comment.author.node.avatar.url}
              alt={comment.author.node.name}
            />
          </div>

          <div className="comment__item__right">
            <h5>{comment.author.node.name}</h5>

            <div
              dangerouslySetInnerHTML={{
                __html: comment.content,
              }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;

