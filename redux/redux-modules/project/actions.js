import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchSelfProjects = (page = 1, filters) => ({
  type: types.FETCH_SELF_PROJECTS,
  payload: axiosConfig.get(
    `/self-projects?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}&page=${page}`
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

export const updateProject = (id, data) => ({
  type: types.UPDATE_PROJECT,
  payload: axiosConfig.put(`/projects/${id}`, data),
});

export const deleteProject = (id) => ({
  type: types.DELETE_PROJECT,
  payload: axiosConfig.delete(`/projects/${id}`),
  meta: { id },
});

export const handleProjectUsers = (id, data) => ({
  type: types.UPDATE_PROJECT_USERS,
  payload: axiosConfig.put(`/projects/${id}/users`, data),
});

export const setCurrentProject = (project) => ({
  type: types.SET_CURRENT_PROJECT,
  payload: project,
});
