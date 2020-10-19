import React, { useContext } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Modal = () => {
  const {
    userForDelete,
    removeUser,
    calculatePagination,
    pagination,
  } = useContext(FirebaseContext);

  const remove = () => {
    if (userForDelete !== null) {
      removeUser(userForDelete.id);
    } else {
      return null;
    }
    const users = document.querySelectorAll(".user-line");

    if (users.length === 1 && pagination.currentPage !== 1) {
      pagination.currentPage--;
      calculatePagination(pagination.currentPage--);
    } else {
      calculatePagination(pagination.currentPage);
    }
  };

  return (
    <div
      className="modal fade"
      id="modal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Удаление пользователя
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {userForDelete !== null
              ? `Вы уверены что хотите удалить пользователя ${userForDelete.username}`
              : ``}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Нет
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              onClick={() => {
                remove();
              }}
            >
              Удалить пользователя
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
