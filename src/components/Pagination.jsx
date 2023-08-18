export const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  nextPage,
  previousPage,
  currentPage,
  firstPage,
  lastPage,
  totalPages,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {/* display all page numbers */}
      {/* <div className="pagination-wrap">
        <ul className="pagination">
          {currentPage >= 2 ? (
            <li className="page-item" onClick={() => previousPage()}>
              <span className="page-link">Previous</span>
            </li>
          ) : (
            ""
          )}

          {pageNumbers.map((number) => (
            <li
              className={`page-item ${
                currentPage == number ? "page-item--current" : ""
              }`}
              key={number}
              onClick={() => paginate(number)}>
              <span className="page-link">{number}</span>
            </li>
          ))}

          {currentPage < pageNumbers.length ? (
            <li className="page-item" onClick={() => nextPage()}>
              <span className="page-link">Next</span>
            </li>
          ) : (
            ""
          )}

          <li className="page-item">
            <div className="page-link">Total Posts: {totalPosts}</div>
          </li>
        </ul>
      </div> */}

      {/* display page number and total pages only */}
      <div className="pagination-wrap2">
        <ul className="pagination">
          {currentPage >= 2 ? (
            <li className="page-item first" onClick={() => firstPage()}>
              <span className="page-link"></span>
            </li>
          ) : (
            ""
          )}

          {currentPage >= 2 ? (
            <li className="page-item previous" onClick={() => previousPage()}>
              <span className="page-link"></span>
            </li>
          ) : (
            ""
          )}

          {currentPage >= 0 ? (
            <li className="page-item no-hover">
              <span className="">
                {currentPage} / {totalPages}
              </span>
            </li>
          ) : (
            ""
          )}

          {currentPage < pageNumbers.length ? (
            <li className="page-item next" onClick={() => nextPage()}>
              <span className="page-link"></span>
            </li>
          ) : (
            ""
          )}

          {currentPage < pageNumbers.length ? (
            <li className="page-item last" onClick={() => lastPage()}>
              <span className="page-link"></span>
            </li>
          ) : (
            ""
          )}
        </ul>

        <div className="total">
          <div className="page-item">Total Posts: {totalPosts}</div>
        </div>
      </div>
    </>
  );
};

export default Pagination;

