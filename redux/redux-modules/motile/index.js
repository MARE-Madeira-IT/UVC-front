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
    case `${types.FETCH_MOTILES}_PENDING`:
    case `${types.FETCH_MOTILE_SELECTOR}_PENDING`:
    case `${types.UPDATE_MOTILE}_PENDING`:
    case `${types.DELETE_MOTILE}_PENDING`:
    case `${types.CREATE_MOTILE}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_MOTILES}_REJECTED`:
    case `${types.FETCH_MOTILE_SELECTOR}_REJECTED`:
    case `${types.CREATE_MOTILE}_REJECTED`:
    case `${types.DELETE_MOTILE}_REJECTED`:
    case `${types.UPDATE_MOTILE}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${types.FETCH_MOTILE_SELECTOR}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selector: action.payload.data.data,
      };

    case `${types.FETCH_MOTILES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
        meta: action.payload.data.meta,
      };

    case `${types.CREATE_MOTILE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: state.data.find(
          (record) =>
            record.report_id === action.payload.data.data.report_id &&
            record.type === action.payload.data.data.type
        )
          ? state.data.map((record) =>
              record.report_id === action.payload.data.data.report_id &&
              record.type === action.payload.data.data.type
                ? action.payload.data.data
                : record
            )
          : [...state.data, action.payload.data.data],
        meta: state.data.find(
          (record) =>
            record.report_id === action.payload.data.data.report_id &&
            record.type === action.payload.data.data.type
        )
          ? { ...state.meta, total: state.meta.total + 1 }
          : state.meta,
      };

    case `${types.DELETE_MOTILE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: state.data.filter((record) => record.id !== action.meta.id),
        meta: {
          ...state.meta,
          total: state.meta.total - 1,
        },
      };

    case `${types.UPDATE_MOTILE}_FULFILLED`:
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
