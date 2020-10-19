import React, { useState, useContext } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Form = () => {
  const [value, setValue] = useState("");
  const firebase = useContext(FirebaseContext);

  const submitHandler = (event) => {
    event.preventDefault();

    if (value.trim()) {
      if (value.trim().indexOf(`@`) >= 0) {
        firebase.filterEmail(value.trim());
        firebase.calculatePagination(1);
      } else {
        firebase.filterUsers(value.trim());
        firebase.calculatePagination(1);
      }

      setValue("");
    } else {
      // alert.show("Введите название заметки");
    }
  };

  const clickHandler = (event) => {
    event.preventDefault();
    firebase.clearFilter();
    firebase.calculatePagination();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <div className="input-group is-invalid">
          <div className="input-group-prepend">
            <span className="input-group-text" id="validatedInputGroupPrepend">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-search"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
                />
                <path
                  fillRule="evenodd"
                  d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                />
              </svg>
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Поиск по имени или email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <a
        href="/"
        onClick={clickHandler}
        className="form-link"
        style={{ display: firebase.filterFlag ? "block" : "none" }}
      >
        Очистить фильтр
      </a>
    </form>
  );
};
