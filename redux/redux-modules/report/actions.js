import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";

export const fetchReports = (page = 1, filters = {}) => ({
  type: types.FETCH_REPORTS,
  payload: axiosConfig.get(
    `/reports?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}&page=${page}`
  ),
});

export const fetchSelectorReports = (filters = {}) => ({
  type: types.FETCH_SELECTOR_REPORTS,
  payload: axiosConfig.get(
    `/selector/reports?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}`
  ),
});

export const fetchReportCoordinates = (filters) => ({
  type: types.FETCH_REPORT_COORDINATES,
  payload: axiosConfig.get(
    `/selector/report-coordinates?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}`
  ),
});

export const createReport = (data) => ({
  type: types.CREATE_REPORT,
  payload: axiosConfig.post(`/reports`, data),
});

export const updateReport = (id, data) => ({
  type: types.UPDATE_REPORT,
  payload: axiosConfig.put(`/reports/${id}`, data),
});

export const deleteReport = (id) => ({
  type: types.DELETE_REPORT,
  payload: axiosConfig.delete(`/reports/${id}`),
  meta: { id },
});
