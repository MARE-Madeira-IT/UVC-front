import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchSelfWorkspaces = (page = 1, filters = {}) => ({
  type: types.FETCH_SELF_WORKSPACES,
  payload: axiosConfig.get(
    `/self-workspaces?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}&page=${page}`
  ),
});

export const fetchWorkspaces = (filters = {}) => ({
  type: types.FETCH_WORKSPACES,
  payload: axiosConfig.get(
    `/workspaces?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}`
  ),
});

export const fetchWorkspacesSelector = (filters = {}) => ({
  type: types.FETCH_WORKSPACES_SELECTOR,
  payload: axiosConfig.get(
    `/selector/workspaces?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}`
  ),
});

export const createWorkspace = (data) => ({
  type: types.CREATE_WORKSPACE,
  payload: axiosConfig.post(`/workspaces`, data),
});

export const updateWorkspace = (id, data) => ({
  type: types.UPDATE_WORKSPACE,
  payload: axiosConfig.put(`/workspaces/${id}`, data),
});

export const deleteWorkspace = (id) => ({
  type: types.DELETE_WORKSPACE,
  payload: axiosConfig.delete(`/workspaces/${id}`),
  meta: { id },
});

export const fetchWorkspaceInvites = () => ({
  type: types.FETCH_WORKSPACE_INVITES,
  payload: axiosConfig.get(`/workspaceUsers/invites`),
});

export const respondToWorkspaceInvite = (id, data) => ({
  type: types.RESPOND_TO_INVITE_WORKSPACE,
  payload: axiosConfig.put(`/workspaceUsers/${id}/accept`, data),
});

export const setCurrentWorkspace = (workspace) => ({
  type: types.SET_CURRENT,
  payload: workspace,
});
