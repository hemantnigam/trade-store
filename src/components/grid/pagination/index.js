import React from "react";
import "./index.scss";

function Pagination({ pages, currentPage, handleClick, totalPages }) {
  return (
    <div className="pagination" data-testid="pagination">
      <div
        data-testid="prev-last"
        className={currentPage === 1 ? "disabled" : ""}
        onClick={() => handleClick("prevLast")}
      >
        {"<<"}
      </div>
      <div
        data-testid="prev"
        className={currentPage === 1 ? "disabled" : ""}
        onClick={() => handleClick("prev")}
      >
        {"<"}
      </div>
      {pages.map((page, index) => (
        <div
          key={index}
          data-testid="page-num-content"
          className={page === currentPage ? "active" : ""}
          onClick={() => handleClick(page)}
        >
          {page}
        </div>
      ))}
      <div
        data-testid="next"
        className={currentPage === totalPages ? "disabled" : ""}
        onClick={() => handleClick("next")}
      >
        {">"}
      </div>
      <div
        data-testid="next-last"
        className={currentPage === totalPages ? "disabled" : ""}
        onClick={() => handleClick("nextLast")}
      >
        {">>"}
      </div>
    </div>
  );
}

export default Pagination;
