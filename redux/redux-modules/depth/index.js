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
    case `${types.FETCH_DEPTHS}_PENDING`:
    case `${types.FETCH_SELECTOR_DEPTHS}_PENDING`:
    case `${types.CREATE_DEPTH}_PENDING`:
    case `${types.DELETE_DEPTH}_PENDING`:
    case `${types.UPDATE_DEPTH}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_DEPTHS}_REJECTED`:
    case `${types.FETCH_SELECTOR_DEPTHS}_REJECTED`:
    case `${types.CREATE_DEPTH}_REJECTED`:
    case `${types.DELETE_DEPTH}_REJECTED`:
    case `${types.UPDATE_DEPTH}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${types.FETCH_SELECTOR_DEPTHS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selector: action.payload.data.data,
      };

    case `${types.FETCH_DEPTHS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
        meta: action.payload.data.meta,
      };

    case `${types.CREATE_DEPTH}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data.data],
        meta: { ...state.meta, total: state.meta.total + 1 },
      };

    case `${types.DELETE_DEPTH}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: state.data.filter((record) => record.id !== action.meta.id),
        meta: {
          ...state.meta,
          total: state.meta.total - 1,
        },
      };

    case `${types.UPDATE_DEPTH}_FULFILLED`:
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
