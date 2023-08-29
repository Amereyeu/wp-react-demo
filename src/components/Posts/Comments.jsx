function Comments({ comments }) {
  return (
    <div className="comment">
      <>
        {comments?.map((comment) => (
          <>
            {comment.node.parent === null && (
              <div key={comment.id} className="comment__item">
                <div className="comment__item__left">
                  <img
                    src={comment.node.author.node.avatar.url}
                    alt={comment.node.author.node.name}
                  />
                </div>

                <div className="comment__item__right">
                  <h5>{comment.node.author.node.name}</h5>

                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: comment.node.content,
                      }}></div>

                    <>
                      {comment.node.replies.edges.map((c, i) => (
                        <div className="commen__item" key={i}>
                          {/* <div className="comment__item__left">
                        <img
                          src={c.node.author.node.avatar.url}
                          alt={c.node.author.node.name}
                        />
                      </div> */}

                          <div className="comment__item__right">
                            <h5>{c.node.author.node.name}</h5>

                            <div
                              className="comment__item subitem"
                              dangerouslySetInnerHTML={{
                                __html: c.node.content,
                              }}></div>

                            <>
                              {c.node.replies.edges.map((cc, i) => (
                                <div className="commen__item" key={i}>
                                  {/* <div className="comment__item__left">
                        <img
                          src={c.node.author.node.avatar.url}
                          alt={c.node.author.node.name}
                        />
                      </div> */}

                                  <div className="comment__item__right">
                                    <h5>{cc.node.author.node.name}</h5>

                                    <div
                                      className="comment__item subitem2"
                                      dangerouslySetInnerHTML={{
                                        __html: cc.node.content,
                                      }}></div>
                                  </div>
                                </div>
                              ))}
                            </>
                          </div>
                        </div>
                      ))}
                    </>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </>
    </div>
  );
}

export default Comments;

