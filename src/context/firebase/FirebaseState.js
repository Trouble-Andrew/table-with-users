import React, { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import {
  SHOW_LOADER,
  REMOVE_USER,
  FETCH_USERS,
  FILTER_USERNAME,
  FILTER_EMAIL,
  CLEAR_FILTER,
  SORT_DATE,
  SORT_RATING,
  SELECT_USER,
  CALCULATE_PAGINATION,
} from "../types";

const url = process.env.REACT_APP_DB_URL;

export const FirebaseState = ({ children }) => {
  const initialState = {
    users: [],
    filteredUsers: [],
    loading: false,
    filterFlag: false,
    userForDelete: null,
    pagination: {
      offset: 5,
      currentPage: 1,
      pages: 0,
    },
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchUsers = async () => {
    showLoader();
    const res = await axios.get(`${url}/users.json`);

    const payload = Object.keys(res.data).map((key) => {
      return {
        ...res.data[key],
        id: key,
      };
    });

    dispatch({
      type: FETCH_USERS,
      payload,
    });
  };

  const filterUsers = async (userName) => {
    try {
      dispatch({
        type: FILTER_USERNAME,
        payload: userName,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const filterEmail = async (userEmail) => {
    try {
      dispatch({
        type: FILTER_EMAIL,
        payload: userEmail,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const sortDate = async (direction) => {
    try {
      dispatch({
        type: SORT_DATE,
        payload: direction,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const sortRating = async (direction) => {
    try {
      dispatch({
        type: SORT_RATING,
        payload: direction,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const clearFilter = async () => {
    try {
      dispatch({
        type: CLEAR_FILTER,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const removeUser = async (id) => {
    await axios.delete(`${url}/users/${id}.json`);
    dispatch({
      type: REMOVE_USER,
      payload: id,
    });
  };

  const selectUser = async (id) => {
    dispatch({
      type: SELECT_USER,
      payload: id,
    });
  };

  const calculatePagination = async (page = false) => {
    const payload = await {
      ...state.pagination,
      currentPage: page ? page : 1,
      pages: Math.ceil(state.filteredUsers.length / state.pagination.offset),
    };

    dispatch({
      type: CALCULATE_PAGINATION,
      payload: payload,
    });
  };

  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        removeUser,
        fetchUsers,
        filterUsers,
        filterEmail,
        sortDate,
        sortRating,
        clearFilter,
        selectUser,
        calculatePagination,
        loading: state.loading,
        users: state.users,
        filteredUsers: state.filteredUsers,
        filterFlag: state.filterFlag,
        userForDelete: state.userForDelete,
        pagination: state.pagination,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
