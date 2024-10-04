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
    dispatch({
      type: types.LOGOUT,
      payload: axiosConfig.get(`${import.meta.env.VITE_API}/api/logout`),
    });
  };
};

export const updateProfilePicture = (id, data) => ({
  type: types.UPDATE_PROFILE_PICTURE,
  payload: api.updateProfilePicture(id, data),
  meta: { globalError: true },
});

export const fetchAllInvites = (page = 1) => ({
  type: types.FETCH_INVITES,
  payload: axiosConfig.get(`/invites?page=${page}`),
});

export const acceptInvite = (id, type, data) => {
  let url = "";

  if (type === "project") {
    url = `/projectUsers/${id}/accept`;
  } else if (type === "workspace") {
    url = `/workspaceUsers/${id}/accept`;
  } else {
    url = `/surveyProgramUsers/${id}/accept`;
  }

  return {
    type: types.ACCEPT_INVITE,
    payload: axiosConfig.put(url, data),
    meta: { id, type },
  };
};
