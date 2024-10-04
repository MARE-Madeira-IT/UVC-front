import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/redux-modules/auth/actions";

const axiosConfig = axios.create({
  baseURL: `${import.meta.env.VITE_API}/api`, // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  withCredentials: true,
  headers: {
    "Content-Type": "application/json", // Set the default content type
    "ngrok-skip-browser-warning": "testing",
  },
});

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.config.url.includes("logout") && error.response.status === 401) {
      store.dispatch(logout());
    }

    if (error.response) {
      return Promise.reject({
        status: error.response.status,
        data: error.response.data,
        message: error.response.statusText || "Request failed",
      });
    } else if (error.request) {
      return Promise.reject({
        status: null,
        message: "No response received from the server",
      });
    } else {
      return Promise.reject({
        message: error.message || "Request setup failed",
      });
    }
  }
);

export default axiosConfig;
