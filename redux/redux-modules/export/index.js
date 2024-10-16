import { types } from "./types";

const initialState = {
  data: [],
  meta: {},
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.FETCH_EXPORTS}_PENDING`:
    case `${types.CREATE_EXPORT}_PENDING`:
    case `${types.DELETE_EXPORT}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_EXPORTS}_REJECTED`:
    case `${types.CREATE_EXPORT}_REJECTED`:
    case `${types.DELETE_EXPORT}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${types.FETCH_EXPORTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
        meta: action.payload.data.meta,
      };

    case `${types.CREATE_EXPORT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data.data],
        meta: !state.meta?.total
          ? {}
          : { ...state.meta, total: state.meta.total + 1 },
      };

    case `${types.DELETE_EXPORT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: state.data.filter((record) => record.id !== action.meta.id),
        meta: {
          ...state.meta,
          total: state.meta.total - 1,
        },
      };

    default:
      return state;
  }
};
