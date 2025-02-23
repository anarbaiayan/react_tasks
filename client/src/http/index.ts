import axios from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem("token", response.data.accessToken);
        $api.defaults.headers.common["Authorization"] = `Bearer ${response.data.accessToken}`;

        return $api(originalRequest);
      } catch (e) {
        console.log("🔵 Saving lastPage:", window.location.pathname);
        localStorage.setItem("lastPage", window.location.pathname);

        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default $api