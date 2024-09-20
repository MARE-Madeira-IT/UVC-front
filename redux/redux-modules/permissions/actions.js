import { types } from "./types";
import axiosConfig from "../../../src/axiosConfig";

export const fetchPermissions = (surveyProgram) => ({
  type: types.FETCH_PERMISSIONS,
  payload: axiosConfig.get(`/surveyPrograms/${surveyProgram}/permissions`),
});
