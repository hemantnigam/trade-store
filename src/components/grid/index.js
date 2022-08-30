import React, { useEffect, useState } from "react";
import "./index.scss";
import Pagination from "./pagination";

const PER_PAGE = 5;
function Grid({ children, columnsDefs, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [totalPages, setTotalPage] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);

  const handleClick = (type) => {
    const count = totalPages;
    if (typeof type === "string") {
      if (type === "prevLast") {
        setCurrentPage(1);
        updatePageList(1, count <= 3 ? count : 3);
      } else if (type === "prev") {
        setCurrentPage((page) => {
          if (pages.indexOf(page - 1) === -1) {
            updatePageList(pages[0] - 1, pages[pages.length - 1] - 1);
          }
          return page - 1;
        });
      } else if (type === "next") {
        setCurrentPage((page) => {
          if (pages.indexOf(page + 1) === -1) {
            updatePageList(pages[0] + 1, pages[pages.length - 1] + 1);
          }
          return page + 1;
        });
      } else if (type === "nextLast") {
        setCurrentPage(count);
        updatePageList(count - 2 <= 0 ? 1 : count - 2, count);
      }
    } else {
      setCurrentPage(type);
    }
  };

  useEffect(() => {
    const count = Math.ceil(data.length / PER_PAGE);
    setTotalPage(count);
    updatePageList(1, count <= 3 ? count : 3);
  }, [data]);

  useEffect(() => {
    if (data && data.length > 0) {
      const startIndex = (currentPage - 1) * PER_PAGE + 1;
      const endIndex =
        startIndex + PER_PAGE <= data.length
          ? startIndex + PER_PAGE
          : data.length;
      const filteredData = [];
      for (let i = startIndex - 1; i < endIndex; i++) {
        filteredData.push(
          <tr className="data-row" key={i}>
            {Object.entries(data[i]).map(([key, value]) => (
              <td className="cell" key={key}>
                {value}
              </td>
            ))}
          </tr>
        );
      }
      if (filteredData.length < PER_PAGE) {
        const emptyList = new Array(PER_PAGE - filteredData.length).fill(
          <tr className="data-row">
            <td colSpan={7}></td>
          </tr>
        );
        setPaginatedData([...filteredData, ...emptyList]);
      } else {
        setPaginatedData([filteredData]);
      }
    }
  }, [currentPage, data]);

  const updatePageList = (start, end) => {
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    setPages(pages);
  };

  return (
    <div className="grid">
      {children}
      <table>
        <thead>
          <tr>
            {columnsDefs.map((column, index) => (
              <th className="cell" key={index}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            paginatedData
          ) : (
            <tr className="no-data">
              <td colSpan={columnsDefs.length}>
                No trades available in the store.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        handleClick={handleClick}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Grid;
