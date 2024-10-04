import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";
import queryString from "query-string";


export const fetchTaxas = (page = 1, filters = {}) => ({
  type: types.FETCH_TAXAS,
  payload: axiosConfig.get(
    `/taxas?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}&page=${page}`
  ),
});

export const fetchSelectorTaxas = (filters = {}) => ({
  type: types.FETCH_SELECTOR_TAXAS,
  payload: axiosConfig.get(
    `/selector/taxas?${queryString.stringify(filters, {
      arrayFormat: "index",
    })}`
  ),
});

export const createTaxa = (data) => ({
  type: types.CREATE_TAXA,
  payload: axiosConfig.post(`/taxas`, data),
});

export const updateValidation = (id, data) => ({
  type: types.UPDATE_TAXA,
  payload: axiosConfig.put(`/taxas/toggle-validation/${id}`, data),
});

export const updateTaxa = (id, data) => ({
  type: types.UPDATE_TAXA,
  payload: axiosConfig.put(`/taxas/${id}`, data),
});

export const uploadTaxaPhoto = (id, data) => ({
  type: types.UPDATE_TAXA,
  payload: axiosConfig.post(`/taxas/photo/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
});

export const deleteTaxa = (id) => ({
  type: types.DELETE_TAXA,
  payload: axiosConfig.delete(`/taxas/${id}`),
  meta: { id },
});
