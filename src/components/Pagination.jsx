import React from "react";

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

  return (
    <div className="pagination-wrap">
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
            className="page-item"
            key={number}
            onClick={() => paginate(number)}
          >
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
          <div className="page-link">Total: {totalPosts}</div>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

