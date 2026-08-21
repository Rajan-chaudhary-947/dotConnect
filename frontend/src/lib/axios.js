import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:8080/api" : import.meta.env.VITE_API_URL,
  withCredentials: true, // Sending cookies with each requests
});

export const getResourceDownloadUrl = (resourceId) =>
  `${axiosInstance.defaults.baseURL}/resources/${resourceId}/download`;
