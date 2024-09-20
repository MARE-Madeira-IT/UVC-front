import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchSurveyProgramUsers = (page = 1, filters = {}) => ({
  type: types.FETCH_USERS,
  payload: axiosConfig.get(
    `surveyProgramUsers?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}&page=${page}`
  ),
});

export const updateSurveyProgramMember = (id, data) => ({
  type: types.UPDATE_MEMBER,
  payload: axiosConfig.put(`surveyProgramUsers/${id}`, data),
});

export const inviteSurveyProgramMember = (data) => ({
  type: types.INVITE_MEMBER,
  payload: axiosConfig.post(`surveyProgramUsers/invite-member`, data),
});

export const removeSurveyProgramUser = (id) => ({
  type: types.REMOVE_MEMBER,
  payload: axiosConfig.delete(`surveyProgramUsers/${id}`),
  meta: { id }
});
