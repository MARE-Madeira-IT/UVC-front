import { types } from "./types";

const initialState = {
  data: [],
  selfData: [],
  selfMeta: [],
  statistics: { members: 0, report: 0, sites: 0, taxa: 0 },
  current: {},
  loading: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case `${types.FETCH_SELF_SURVEY_PROGRAMS}_PENDING`:
    case `${types.CREATE_SURVEY_PROGRAM}_PENDING`:
    case `${types.FETCH_SURVEY_PROGRAM_STATISTICS}_PENDING`:
    case `${types.FETCH_SURVEY_PROGRAMS}_PENDING`:
    case `${types.DELETE_SURVEY_PROGRAM}_PENDING`:
    case `${types.UPDATE_SURVEY_PROGRAM}_PENDING`:
    case `${types.UPDATE_SURVEY_PROGRAM_USERS}_PENDING`:
      return {
        ...state,
        loading: true,
      };

    case `${types.FETCH_SELF_SURVEY_PROGRAMS}_REJECTED`:
    case `${types.CREATE_SURVEY_PROGRAM}_REJECTED`:
    case `${types.FETCH_SURVEY_PROGRAM_STATISTICS}_REJECTED`:
    case `${types.FETCH_SURVEY_PROGRAMS}_REJECTED`:
    case `${types.DELETE_SURVEY_PROGRAM}_REJECTED`:
    case `${types.UPDATE_SURVEY_PROGRAM}_REJECTED`:
    case `${types.UPDATE_SURVEY_PROGRAM_USERS}_REJECTED`:
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
        selfMeta: action.payload.data.meta,
      };

    case `${types.CREATE_SURVEY_PROGRAM}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selfData: [...state.selfData, action.payload.data.data],
        selfMeta: { ...state.selfMeta, total: state.selfMeta.total + 1 },
      };

    case `${types.DELETE_SURVEY_PROGRAM}_FULFILLED`:
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
    case `${types.UPDATE_SURVEY_PROGRAM_USERS}_FULFILLED`:
    case `${types.UPDATE_SURVEY_PROGRAM}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selfData: state.selfData.map((el) =>
          el.id === action.payload.data.data.id ? action.payload.data.data : el
        ),
      };

    default:
      return state;
  }
};
