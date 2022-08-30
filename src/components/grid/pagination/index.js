import React from "react";
import "./index.scss";

function Pagination({ pages, currentPage, handleClick, totalPages }) {
  return (
    <div className="pagination">
      <div
        className={currentPage === 1 ? "disabled" : ""}
        onClick={() => handleClick("prevLast")}
      >
        {"<<"}
      </div>
      <div
        className={currentPage === 1 ? "disabled" : ""}
        onClick={() => handleClick("prev")}
      >
        {"<"}
      </div>
      {pages.map((page, index) => (
        <div
          key={index}
          className={page === currentPage ? "active" : ""}
          onClick={() => handleClick(page)}
        >
          {page}
        </div>
      ))}
      <div
        className={currentPage === totalPages ? "disabled" : ""}
        onClick={() => handleClick("next")}
      >
        {">"}
      </div>
      <div
        className={currentPage === totalPages ? "disabled" : ""}
        onClick={() => handleClick("nextLast")}
      >
        {">>"}
      </div>
    </div>
  );
}

export default Pagination;
