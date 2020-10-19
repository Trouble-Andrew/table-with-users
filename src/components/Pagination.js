import React, { useContext, useEffect } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Pagination = () => {
  const { pagination, calculatePagination, filteredUsers } = useContext(
    FirebaseContext
  );

  const previousPage = (event) => {
    event.preventDefault();
    pagination.currentPage--;
    calculatePagination(pagination.currentPage--);
  };

  const nextPage = (event) => {
    event.preventDefault();
    if (
      Math.ceil(filteredUsers.length / pagination.offset) >=
      pagination.currentPage + 1
    ) {
      pagination.currentPage++;
      calculatePagination(pagination.currentPage++);
    }
  };

  const goToPage = (event) => {
    event.preventDefault();
    calculatePagination(parseInt(event.target.text));
  };

  const pages = [];

  for (
    let index = 0;
    index < Math.ceil(filteredUsers.length / pagination.offset);
    index++
  ) {
    pages.push(
      <li
        className={
          pagination.currentPage === index + 1
            ? "page-item page-item-number active"
            : "page-item page-item-number"
        }
        key={index}
      >
        {pagination.currentPage === index + 1 ? (
          <span className="page-link">
            {index + 1}
            <span className="sr-only">(current)</span>
          </span>
        ) : (
          <a
            className="page-link"
            href="/"
            onClick={(event) => {
              goToPage(event);
            }}
          >
            {index + 1}
          </a>
        )}
      </li>
    );
  }

  useEffect(() => {
    calculatePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li
          className={
            pagination.currentPage === 1 ? "page-item disabled" : "page-item"
          }
        >
          {pagination.currentPage === 1 ? (
            <span className="page-link">Previous</span>
          ) : (
            <a className="page-link" href="/" onClick={previousPage}>
              Previous
            </a>
          )}
        </li>
        {pages}
        <li className="page-item">
          {pagination.currentPage === pagination.pages ? (
            <span className="page-link">Next</span>
          ) : (
            <a className="page-link" href="/" onClick={nextPage}>
              Next
            </a>
          )}
        </li>
      </ul>
    </nav>
  );
};
