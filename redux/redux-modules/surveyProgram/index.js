import { types } from "./types";

const initialState = {
  data: [],
  selfData: [],
  statistics: { members: 0, report: 0, sites: 0, taxa: 0 },
  current: {},
  loading: false,
  invites: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.FETCH_SELF_SURVEY_PROGRAMS}_PENDING`:
    case `${types.CREATE_SURVEY_PROGRAM}_PENDING`:
    case `${types.INVITE_MEMBER}_PENDING`:
    case `${types.FETCH_SURVEY_PROGRAM_INVITES}_PENDING`:
    case `${types.FETCH_SURVEY_PROGRAM_STATISTICS}_PENDING`:
    case `${types.FETCH_SURVEY_PROGRAMS}_PENDING`:
    case `${types.RESPOND_TO_INVITE}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_SELF_SURVEY_PROGRAMS}_REJECTED`:
    case `${types.CREATE_SURVEY_PROGRAM}_REJECTED`:
    case `${types.INVITE_MEMBER}_REJECTED`:
    case `${types.FETCH_SURVEY_PROGRAM_INVITES}_REJECTED`:
    case `${types.FETCH_SURVEY_PROGRAM_STATISTICS}_REJECTED`:
    case `${types.FETCH_SURVEY_PROGRAMS}_REJECTED`:
    case `${types.RESPOND_TO_INVITE}_REJECTED`:
      return {
        ...state,
        loading: false,
      };

    case `${types.FETCH_SURVEY_PROGRAMS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: action.payload.data.data,
      };

    case `${types.RESPOND_TO_INVITE}_FULFILLED`:
    case `${types.FETCH_SURVEY_PROGRAM_INVITES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        invites: action.payload.data,
      };

    case `${types.FETCH_SURVEY_PROGRAM_STATISTICS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        statistics: action.payload.data.data,
      };

    case `${types.FETCH_SELF_SURVEY_PROGRAMS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selfData: action.payload.data.data,
      };

    case `${types.CREATE_SURVEY_PROGRAM}_FULFILLED`:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data.data],
      };

    case `${types.INVITE_MEMBER}_FULFILLED`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
