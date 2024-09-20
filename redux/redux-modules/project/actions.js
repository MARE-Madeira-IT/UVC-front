import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchSelfProjects = (filters) => ({
  type: types.FETCH_SELF_PROJECTS,
  payload: axiosConfig.get(
    `/self-projects?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}`
  ),
});

export const fetchProjects = (filters = {}) => ({
  type: types.FETCH_PROJECTS,
  payload: axiosConfig.get(
    `/projects?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}`
  ),
});

export const createProject = (data) => ({
  type: types.CREATE_PROJECT,
  payload: axiosConfig.post(`/projects`, data),
});

export const updateSurveyProgram = (id, data) => ({
  type: types.UPDATE_PROJECT,
  payload: axiosConfig.put(`/projects/${id}`, data),
});

export const deleteSurveyProgram = (id) => ({
  type: types.DELETE_PROJECT,
  payload: axiosConfig.delete(`/projects/${id}`),
  meta: { id },
});

export const fetchSurveyProgramInvites = () => ({
  type: types.FETCH_PROJECT_INVITES,
  payload: axiosConfig.get(`/projectUsers/invites`),
});

export const respondToProjectInvite = (id, data) => ({
  type: types.RESPOND_TO_INVITE_PROJECT,
  payload: axiosConfig.put(`/projectUsers/${id}/accept`, data),
});
