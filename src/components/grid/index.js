import React, { useEffect, useState } from "react";
import "./index.scss";
import Pagination from "./pagination";

const PER_PAGE = 5;
function Grid({ children, columnsDefs, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([1]);
  const [totalPages, setTotalPage] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);

  /**
   *
   * @param {*} type checks if type is number or string
   */
  const handleClick = (type) => {
    const count = totalPages;

    // checks if clicked button is page number or not
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
    //checks if data is empty or not
    if (data && data.length > 0) {
      const startIndex = (currentPage - 1) * PER_PAGE;
      const endIndex =
        startIndex + PER_PAGE <= data.length
          ? startIndex + PER_PAGE
          : data.length;
      const filteredData = [];

      //iterate over all trades and generate trade jsx
      for (let i = startIndex; i < endIndex; i++) {
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

      //adds empty rows to have fixed height grid.
      if (filteredData.length < PER_PAGE) {
        const emptyList = new Array(PER_PAGE - filteredData.length)
          .fill()
          .map((_, index) => (
            <tr key={index} className="data-row">
              <td colSpan={7}></td>
            </tr>
          ));
        setPaginatedData([...filteredData, ...emptyList]);
      } else {
        setPaginatedData([filteredData]);
      }
    }
  }, [currentPage, data]);

  /**
   *
   * @param {*} start starting page number in pagination
   * @param {*} end ending page number in pagination
   */
  const updatePageList = (start, end) => {
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    setPages(pages);
  };

  return (
    <div className="grid" data-testid="grid">
      {children}
      <table>
        <thead>
          <tr data-testid="data-row">
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
            <tr className="no-data" data-testid="no-data">
              <td colSpan={columnsDefs.length}>
                No trades available in the store.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {data && data.length > 0 && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          handleClick={handleClick}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default Grid;
