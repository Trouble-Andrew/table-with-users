import {
  SHOW_LOADER,
  FETCH_USERS,
  REMOVE_USER,
  FILTER_USERNAME,
  FILTER_EMAIL,
  SORT_DATE,
  SORT_RATING,
  CLEAR_FILTER,
  SELECT_USER,
  SELECT_PAGE,
  CALCULATE_PAGINATION,
} from "../types";

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [FETCH_USERS]: (state, { payload }) => ({
    ...state,
    users: payload,
    // filteredUsers: [...payload],
    filteredUsers: payload.filter((user) => user.username),
    loading: false,
  }),
  [REMOVE_USER]: (state, { payload }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== payload),
    filteredUsers: state.filteredUsers.filter((user) => user.id !== payload),
  }),
  [SELECT_USER]: (state, { payload }) => ({
    ...state,
    userForDelete: payload,
  }),
  [FILTER_USERNAME]: (state, { payload }) => ({
    ...state,
    filterFlag: true,
    filteredUsers: state.users.filter((user) =>
      user.username
        ? user.username.toLowerCase() === payload.toLowerCase()
        : null
    ),
  }),
  [FILTER_EMAIL]: (state, { payload }) => ({
    ...state,
    filterFlag: true,
    filteredUsers: state.users.filter((user) =>
      user.email ? user.email.toLowerCase() === payload.toLowerCase() : null
    ),
  }),
  [SORT_DATE]: (state, { payload }) => ({
    ...state,
    filterFlag: true,
    filteredUsers: state.filteredUsers.sort((a, b) => {
      if (payload) {
        return new Date(b.registration_date) - new Date(a.registration_date);
      } else {
        return new Date(a.registration_date) - new Date(b.registration_date);
      }
    }),
  }),
  [SORT_RATING]: (state, { payload }) => ({
    ...state,
    filterFlag: true,
    filteredUsers: state.filteredUsers.sort((a, b) => {
      if (payload) {
        return b.rating - a.rating;
      } else {
        return a.rating - b.rating;
      }
    }),
  }),
  [CLEAR_FILTER]: (state) => ({
    ...state,
    filterFlag: false,
    filteredUsers: state.users.filter((user) => user.username),
  }),
  [CALCULATE_PAGINATION]: (state, { payload }) => ({
    ...state,
    pagination: payload,
  }),
  [SELECT_PAGE]: (state, { payload }) => ({
    ...state,
    pagination: payload,
  }),
  DEFALUT: (state) => state,
};

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
