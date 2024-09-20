import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchProjectUsers = (page = 1, filters = {}) => ({
  type: types.FETCH_USERS,
  payload: axiosConfig.get(
    `projectUsers?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}&page=${page}`
  ),
});

export const updateProjectMember = (id, data) => ({
  type: types.UPDATE_MEMBER,
  payload: axiosConfig.put(`projectUsers/${id}`, data),
});

export const inviteProjectMember = (data) => ({
  type: types.INVITE_MEMBER,
  payload: axiosConfig.post(`projectUsers/invite-member`, data),
});

export const removeProjectUser = (id) => ({
  type: types.REMOVE_MEMBER,
  payload: axiosConfig.delete(`projectUsers/${id}`),
  meta: { id }
});
