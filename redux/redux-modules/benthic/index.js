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
    case `${types.FETCH_BENTHICS}_PENDING`:
    case `${types.FETCH_BENTHIC_SELECTOR}_PENDING`:
    case `${types.UPDATE_BENTHIC}_PENDING`:
    case `${types.DELETE_BENTHIC}_PENDING`:
    case `${types.CREATE_BENTHIC}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_BENTHICS}_REJECTED`:
    case `${types.FETCH_BENTHIC_SELECTOR}_REJECTED`:
    case `${types.CREATE_BENTHIC}_REJECTED`:
    case `${types.DELETE_BENTHIC}_REJECTED`:
    case `${types.UPDATE_BENTHIC}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${types.FETCH_BENTHIC_SELECTOR}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selector: action.payload.data.data,
      };

    case `${types.FETCH_BENTHICS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
        meta: action.payload.data.meta,
      };

    case `${types.CREATE_BENTHIC}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data.data],
        meta: { ...state.meta, total: state.meta.total + 1 },
      };

    case `${types.DELETE_BENTHIC}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: state.data.filter((record) => record.id !== action.meta.id),
        meta: {
          ...state.meta,
          total: state.meta.total - 1,
        },
      };

    case `${types.UPDATE_BENTHIC}_FULFILLED`:
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
