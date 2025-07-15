import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authorizationToken = Cookies.get("accessToken");
    if (authorizationToken) {
      config.headers.Authorization = `Bearer ${authorizationToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error responses (e.g., 401, 403, etc.)
    if (error.response?.status === 401) {
      // Handle unauthorized access
      Cookies.remove("accessToken");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 