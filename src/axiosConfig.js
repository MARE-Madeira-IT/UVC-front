import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/redux-modules/auth/actions";
import { notification } from "antd";

const axiosConfig = axios.create({
  baseURL: `${import.meta.env.VITE_API}/api`, // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", // Set the default content type
  },
});

const openNotification = ({ title, message, type }) => {
  notification.open({
    type: type,
    message: title,
    description: message,
    placement: "topRight",
  });
};

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.config.url.includes("logout") && error.response.status === 401) {
      store.dispatch(logout());
    }

    if (error.response.status === 403) {
      history.back();
    }

    if (error.response) {
      openNotification({
        title: error.response.statusText,
        message: error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.response?.data?.errors
          ? Object.values(error?.response?.data?.errors)[0]
          : null,
        type: "error",
      });
      return Promise.reject({
        status: error.response.status,
        data: error.response.data,
        message: error.response.statusText || "Request failed",
      });
    } else if (error.request) {
      openNotification({
        title: "No response received from the server",
        type: "error",
      });
      return Promise.reject({
        status: null,
        message: "No response received from the server",
      });
    } else {
      openNotification({ title: "Request setup failed", type: "error" });

      return Promise.reject({
        message: error.message || "Request setup failed",
      });
    }
  }
);

export default axiosConfig;
