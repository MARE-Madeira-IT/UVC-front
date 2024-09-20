import { types } from "./types";

const initialState = {
  data: [],
  meta: {},
  selfData: [],
  selfMeta: {},
  current: {},
  loading: false,
  invites: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.FETCH_SELF_PROJECTS}_PENDING`:
    case `${types.CREATE_PROJECT}_PENDING`:
    case `${types.FETCH_PROJECT_INVITES}_PENDING`:
    case `${types.FETCH_PROJECTS}_PENDING`:
    case `${types.RESPOND_TO_INVITE_PROJECT}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_SELF_PROJECTS}_REJECTED`:
    case `${types.CREATE_PROJECT}_REJECTED`:
    case `${types.FETCH_PROJECT_INVITES}_REJECTED`:
    case `${types.FETCH_PROJECTS}_REJECTED`:
    case `${types.RESPOND_TO_INVITE_PROJECT}_REJECTED`:
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

    case `${types.RESPOND_TO_INVITE_PROJECT}_FULFILLED`:
    case `${types.FETCH_PROJECT_INVITES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        invites: action.payload.data.data,
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
        data: [...state.data, action.payload.data.data],
        meta: !state.meta?.total ? {} : { ...state.meta, total: state.meta.total + 1 },
        selfMeta: { ...state.selfMeta, total: state.selfMeta.total + 1 },
      };

    default:
      return state;
  }
};
