export const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  nextPage,
  previousPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  console.log(totalPages);

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
            <li className="page-item" onClick={() => previousPage()}>
              <span className="page-link">Previous</span>
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
            <li className="page-item" onClick={() => nextPage()}>
              <span className="page-link">Next</span>
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


