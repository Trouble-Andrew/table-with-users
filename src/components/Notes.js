import React, { useState, useContext } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Pagination } from "./Pagination";

export const Notes = ({ users }) => {
  const [dateDirection, setDateDirection] = useState(true);
  const [ratingDirection, setRatingDirection] = useState(true);
  const [sortFlag, setSortFlag] = useState("");
  const firebase = useContext(FirebaseContext);

  const sortDateHandler = (event) => {
    event.preventDefault();
    firebase.sortDate(dateDirection);
    setDateDirection(!dateDirection);
    setSortFlag("date");
  };

  const sortRatingHandler = (event) => {
    event.preventDefault();
    firebase.sortRating(ratingDirection);
    setRatingDirection(!ratingDirection);
    setSortFlag("rating");
  };

  const openModal = (user) => {
    firebase.selectUser(user);
  };

  return (
    <div className="table-container">
      <div className="sort">
        <p className="sort-text">Сортировка:</p>
        <a
          href="/"
          className={
            sortFlag === "date" && firebase.filterFlag
              ? "sort-link sort-link--active"
              : "sort-link"
          }
          onClick={sortDateHandler}
        >
          Дата регистрации
        </a>
        <a
          href="/"
          className={
            sortFlag === "rating" && firebase.filterFlag
              ? "sort-link sort-link--active"
              : "sort-link"
          }
          onClick={sortRatingHandler}
        >
          Рейтинг
        </a>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя пользователя</th>
            <th scope="col">Email</th>
            <th scope="col">Дата регистрации</th>
            <th scope="col">Рейтинг</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => {
            let current =
              firebase.pagination.currentPage === 1
                ? firebase.pagination.currentPage - 1
                : firebase.pagination.currentPage * firebase.pagination.offset -
                  firebase.pagination.offset;
            if (
              key >= current &&
              key <= current + firebase.pagination.offset - 1
            ) {
              if (user.username) {
                return (
                  <tr key={user.id} className="user-line">
                    <th scope="row">{user.username}</th>
                    <td>{user.email}</td>
                    <td>{user.registration_date}</td>
                    <td>{user.rating}</td>
                    <td>
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#modal"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => openModal(user)}
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                );
              }
            }
            return null;
          })}
        </tbody>
      </table>
      {users.length > firebase.pagination.offset ? <Pagination /> : null}
    </div>
  );
};
