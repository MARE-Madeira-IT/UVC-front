import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchWorkspaceUsers = (page = 1, filters = {}) => ({
  type: types.FETCH_USERS,
  payload: axiosConfig.get(
    `workspaceUsers?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}&page=${page}`
  ),
});

export const inviteWorkspaceMember = (data) => ({
  type: types.INVITE_MEMBER,
  payload: axiosConfig.post(`workspaceUsers/invite-member`, data),
});

export const updateWorkspaceMember = (id, data) => ({
  type: types.UPDATE_MEMBER,
  payload: axiosConfig.put(`workspaceUsers/${id}`, data),
});

export const removeWorkspaceUser = (id) => ({
  type: types.REMOVE_MEMBER,
  payload: axiosConfig.delete(`workspaceUsers/${id}`),
  meta: { id },
});
