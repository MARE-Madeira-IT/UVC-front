import { types } from "./types";

const initialState = {
  data: [],
  meta: {},
  selfData: [],
  selfMeta: {},
  current: {},
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.FETCH_SELF_PROJECTS}_PENDING`:
    case `${types.CREATE_PROJECT}_PENDING`:
    case `${types.FETCH_PROJECTS}_PENDING`:
    case `${types.UPDATE_PROJECT_USERS}_PENDING`:
    case `${types.UPDATE_PROJECT}_PENDING`:
    case `${types.DELETE_PROJECT}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_SELF_PROJECTS}_REJECTED`:
    case `${types.CREATE_PROJECT}_REJECTED`:
    case `${types.FETCH_PROJECTS}_REJECTED`:
    case `${types.UPDATE_PROJECT_USERS}_REJECTED`:
    case `${types.UPDATE_PROJECT}_REJECTED`:
    case `${types.DELETE_PROJECT}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${types.FETCH_PROJECTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
        meta: action.payload.data.meta,
      };

    case `${types.FETCH_SELF_PROJECTS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selfData: action.payload.data.data,
        selfMeta: action.payload.data.meta,
      };

    case `${types.CREATE_PROJECT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selfData: [...state.selfData, action.payload.data.data],
        selfMeta: { ...state.selfMeta, total: state.selfMeta.total + 1 },
      };
    case `${types.UPDATE_PROJECT_USERS}_FULFILLED`:
    case `${types.UPDATE_PROJECT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        current:
          state.current.id === action.payload.data.data.id
            ? action.payload.data.data
            : state.current,
        selfData: state.selfData.map((el) =>
          el.id === action.payload.data.data.id ? action.payload.data.data : el
        ),
      };

    case `${types.DELETE_PROJECT}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selfData: state.selfData.filter(
          (record) => record.id !== action.meta.id
        ),
        selfMeta: {
          ...state.selfMeta,
          total: state.selfMeta.total - 1,
        },
      };
    case types.SET_CURRENT_PROJECT:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};
