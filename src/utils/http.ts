import { message } from "antd";
import axios from "axios";
import cookie from "cookie";

const http = axios.create({
  baseURL: "/api",
});

http.interceptors.request.use((config) => {
  const cookies = cookie.parse(document.cookie);
  const jwt = cookies?.["jwt"];
  config.headers["Authorization"] = `Bearer ${jwt}`;
  return config;
});

http.interceptors.response.use(
  (response) => {
    const { code, message } = response.data;
    if (code === 0) {
      return response;
    } else {
      const err = new Error(message);
      Object.defineProperty(err, "meta", { value: response });
      return Promise.reject(err);
    }
  },
  (error) => {
    if (error.response?.status === 401) {
      return Promise.reject(error);
    } else {
      message.error(error.message);
    }
  }
);

export default http;
