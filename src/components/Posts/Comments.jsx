function Comments({ comments, isLoaded }) {
  if (isLoaded) {
    return (
      <div className="comment">
        {comments
          // .sort(
          //   (a, b) =>
          //     a._links.self[0].href.slice(45, 47) -
          //     b._links.self[0].href.slice(45, 47)
          // )
          .map((comment) => (
            <div key={comment.id} className="comment__item">
              <div className="comment__item__left">
                <img
                  src={comment.author_avatar_urls["48"]}
                  alt={comment.author_name}
                />
              </div>

              <div className="comment__item__right">
                <h5>{comment.author_name}</h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: comment.content.rendered,
                  }}></div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return null;
}

export default Comments;

