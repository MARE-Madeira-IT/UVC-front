import { types } from "./types";
import api from "../api/auth";
import axiosConfig from "../../../src/axiosConfig";

export const createUser = (data) => ({
  type: types.CREATE_USER,
  payload: api.createUser(data),
});

export const login = (data) => {
  return (dispatch) => {
    return axiosConfig
      .post(`${import.meta.env.VITE_API}/api/login`, data)
      .then((res) => {
        dispatch(loginSuccess(res.data.user));
      });
  };
};

export const me = () => ({
  type: types.ME,
  payload: axiosConfig.get(`/me`),
});

export function loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user: user,
  };
}

export const logout = () => {
  return (dispatch) => {
    const response = dispatch({
      type: types.LOGOUT,
      payload: axiosConfig.get(`${import.meta.env.VITE_API}/api/logout`),
    });
    response.then((res) => {
      window.localStorage.removeItem("persist:root");
    });
  };
};

export const updateProfilePicture = (id, data) => ({
  type: types.UPDATE_PROFILE_PICTURE,
  payload: api.updateProfilePicture(id, data),
  meta: { globalError: true },
});
