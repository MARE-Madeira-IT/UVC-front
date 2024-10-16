import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchExports = (page = 1, filters = {}) => ({
  type: types.FETCH_EXPORTS,
  payload: axiosConfig.get(
    `/exports?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}&page=${page}`
  ),
});

export const createExport = (data) => ({
  type: types.CREATE_EXPORT,
  payload: axiosConfig.post(`/exports`, data),
});

export const deleteExport = (id) => ({
  type: types.DELETE_EXPORT,
  payload: axiosConfig.delete(`/exports/${id}`),
  meta: { id },
});
