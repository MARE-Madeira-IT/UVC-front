import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchUsers = (page = 1, filters = {}) => ({
  type: types.FETCH_USERS,
  payload: axiosConfig.get(
    `surveyProgramHasUsers?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}&page=${page}`
  ),
});

export const updateMember = (id, data) => ({
  type: types.UPDATE_MEMBER,
  payload: axiosConfig.put(`surveyProgramHasUsers/${id}`, data),
});

export const inviteMember = (data) => ({
  type: types.INVITE_MEMBER,
  payload: axiosConfig.post(`surveyProgramHasUsers/invite-member`, data),
});

export const removeUser = (id) => ({
  type: types.REMOVE_MEMBER,
  payload: axiosConfig.delete(`surveyProgramHasUsers/${id}`),
  meta: { id }
});
