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
    case `${types.FETCH_FUNCTIONS}_PENDING`:
    case `${types.FETCH_SELECTOR_FUNCTIONS}_PENDING`:
    case `${types.CREATE_FUNCTION}_PENDING`:
    case `${types.DELETE_FUNCTION}_PENDING`:
    case `${types.UPDATE_FUNCTION}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_FUNCTIONS}_REJECTED`:
    case `${types.FETCH_SELECTOR_FUNCTIONS}_REJECTED`:
    case `${types.CREATE_FUNCTION}_REJECTED`:
    case `${types.DELETE_FUNCTION}_REJECTED`:
    case `${types.UPDATE_FUNCTION}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${types.FETCH_SELECTOR_FUNCTIONS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selector: action.payload.data.data,
      };

    case `${types.FETCH_FUNCTIONS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
        meta: action.payload.data.meta,
      };

    case `${types.CREATE_FUNCTION}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data.data],
        meta: { ...state.meta, total: state.meta.total + 1 },
      };

    case `${types.DELETE_FUNCTION}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: state.data.filter((record) => record.id !== action.meta.id),
        meta: {
          ...state.meta,
          total: state.meta.total - 1,
        },
      };

    case `${types.UPDATE_FUNCTION}_FULFILLED`:
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
