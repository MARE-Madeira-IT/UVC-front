import { types } from "./types";

const initialState = {
  data: [], //
  isAuthenticated: false,
  loading: false,
  user: null,
  invites: [],
  invitesMeta: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.CREATE_USER}_PENDING`:
    case `${types.LOGIN}_PENDING`:
    case `${types.LOGOUT}_PENDING`:
    case `${types.ME}_PENDING`:
    case `${types.UPDATE_PROFILE_PICTURE}_PENDING`:
    case `${types.FETCH_INVITES}_PENDING`:
    case `${types.ACCEPT_INVITE}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.CREATE_USER}_REJECTED`:
    case `${types.ME}_REJECTED`:
    case `${types.LOGIN}_REJECTED`:
    case `${types.UPDATE_PROFILE_PICTURE}_REJECTED`:
    case `${types.ACCEPT_INVITE}_REJECTED`:
    case `${types.FETCH_INVITES}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${types.CREATE_USER}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: [action.payload.data, ...state.data],
      };

    case `${types.ME}_FULFILLED`:
    case `${types.LOGIN}_FULFILLED`:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case `${types.LOGOUT}_FULFILLED`:
    case `${types.LOGOUT}_REJECTED`:
      window.localStorage.removeItem("persist:root");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case `${types.LOGIN_SUCCESS}`:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.user,
      };
    case `${types.UPDATE_PROFILE_PICTURE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        user: action.payload.data.data,
      };

    case `${types.FETCH_INVITES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        invites: action.payload.data.data,
        invitesMeta: action.payload.data.meta,
      };
    case `${types.ACCEPT_INVITE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        invitesMeta: {
          ...state.invitesMeta,
          total: state.invitesMeta.total - 1,
        },
        invites: state.invites.filter(
          (record) =>
            !(record.id === action.meta.id && record.type === action.meta.type)
        ),
      };

    default:
      return state;
  }
};
