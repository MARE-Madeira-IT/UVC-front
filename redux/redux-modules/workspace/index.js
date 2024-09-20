import { types } from "./types";

const initialState = {
  data: [],
  selfData: [],
  meta: {},
  selfMeta: {},
  current: {},
  loading: false,
  invites: [],
  selector: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.FETCH_SELF_WORKSPACES}_PENDING`:
    case `${types.CREATE_WORKSPACE}_PENDING`:
    case `${types.FETCH_WORKSPACE_INVITES}_PENDING`:
    case `${types.FETCH_WORKSPACES}_PENDING`:
    case `${types.RESPOND_TO_INVITE_WORKSPACE}_PENDING`:
    case `${types.FETCH_WORKSPACES_SELECTOR}_PENDING`:
    case `${types.UPDATE_WORKSPACE}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_SELF_WORKSPACES}_REJECTED`:
    case `${types.CREATE_WORKSPACE}_REJECTED`:
    case `${types.FETCH_WORKSPACE_INVITES}_REJECTED`:
    case `${types.FETCH_WORKSPACES}_REJECTED`:
    case `${types.FETCH_WORKSPACES_SELECTOR}_REJECTED`:
    case `${types.RESPOND_TO_INVITE_WORKSPACE}_REJECTED`:
    case `${types.UPDATE_WORKSPACE}_REJECTED`:
      return {
        ...state,
        loading: false,
      };
    case `${types.UPDATE_WORKSPACE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selfData: state.selfData.map((el) =>
          el.id === action.payload.data.data.id ? action.payload.data.data : el
        ),
      };

    case `${types.FETCH_WORKSPACES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        meta: action.payload.data.meta,
        data: action.payload.data.data,
      };
    case `${types.FETCH_WORKSPACES_SELECTOR}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selector: action.payload.data.data,
      };
    case `${types.RESPOND_TO_INVITE_WORKSPACE}_FULFILLED`:
    case `${types.FETCH_WORKSPACE_INVITES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        invites: action.payload.data.data,
      };

    case `${types.FETCH_SELF_WORKSPACES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selfData: action.payload.data.data,
        selfMeta: action.payload.data.meta,
      };

    case `${types.CREATE_WORKSPACE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data.data],
        meta: !state.meta?.total
          ? {}
          : { ...state.meta, total: state.meta.total + 1 },
        selfMeta: { ...state.selfMeta, total: state.selfMeta.total + 1 },
      };
    case types.SET_CURRENT:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};
