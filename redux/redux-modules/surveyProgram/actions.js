import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchSelfSurveyPrograms = (page, filters) => ({
  type: types.FETCH_SELF_SURVEY_PROGRAMS,
  payload: axiosConfig.get(`/self-survey-programs?${queryString.stringify(filters, {
    arrayFormat: "index",
  })}&page=${page}`),
});

export const fetchSurveyProgramStatistics = (id) => ({
  type: types.FETCH_SURVEY_PROGRAM_STATISTICS,
  payload: axiosConfig.get(`/survey-program-statistics/${id}`),
});

export const fetchSurveyPrograms = (filters = {}) => ({
  type: types.FETCH_SURVEY_PROGRAMS,
  payload: axiosConfig.get(
    `/surveyPrograms?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}`
  ),
});

export const createSurveyProgram = (data) => ({
  type: types.CREATE_SURVEY_PROGRAM,
  payload: axiosConfig.post(`/surveyPrograms`, data),
});

export const updateSurveyProgram = (id, data) => ({
  type: types.UPDATE_SURVEY_PROGRAM,
  payload: axiosConfig.put(`/surveyPrograms/${id}`, data),
});

export const deleteSurveyProgram = (id) => ({
  type: types.DELETE_SURVEY_PROGRAM,
  payload: axiosConfig.delete(`/surveyPrograms/${id}`),
  meta: { id },
});

export const handleSurveyProgramUsers = (id, data) => ({
  type: types.UPDATE_SURVEY_PROGRAM_USERS,
  payload: axiosConfig.put(`/surveyPrograms/${id}/users`, data),
});