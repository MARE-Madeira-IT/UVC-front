import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchUsers = (page = 1, filters = {}) => ({
  type: types.FETCH_USERS,
  payload: axiosConfig.get(
    `surveyPrograms/members?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}&page=${page}`
  ),
});

export const updateMember = (id, userId, data) => ({
  type: types.UPDATE_MEMBER,
  payload: axiosConfig.put(
    `surveyPrograms/${id}/members/${userId}?surveyProgram=${id}`,
    data
  ),
});
