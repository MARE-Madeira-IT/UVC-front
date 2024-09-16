import { types } from "./types";

const initialState = {
  data: [],
  selector: [],
  meta: {},
  current: {},
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.FETCH_INDICATORS}_PENDING`:
    case `${types.FETCH_INDICATOR_SELECTOR}_PENDING`:
    case `${types.UPDATE_INDICATOR}_PENDING`:
    case `${types.DELETE_INDICATOR}_PENDING`:
    case `${types.CREATE_INDICATOR}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_INDICATORS}_REJECTED`:
    case `${types.FETCH_INDICATOR_SELECTOR}_REJECTED`:
    case `${types.CREATE_INDICATOR}_REJECTED`:
    case `${types.DELETE_INDICATOR}_REJECTED`:
    case `${types.UPDATE_INDICATOR}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${types.FETCH_INDICATOR_SELECTOR}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selector: action.payload.data.data,
      };

    case `${types.FETCH_INDICATORS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
        meta: action.payload.data.meta,
      };

    case `${types.CREATE_INDICATOR}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data.data],
      };

    case `${types.DELETE_INDICATOR}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: state.data.filter((record) => record.id !== action.meta.id),
      };

    case `${types.UPDATE_INDICATOR}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: state.data.map((record) =>
          record.id === action.payload.data.data.id
            ? action.payload.data.data
            : record
        ),
      };
    default:
      return state;
  }
};
