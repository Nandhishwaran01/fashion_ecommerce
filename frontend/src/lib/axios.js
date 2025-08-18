import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL + "/api" // Production API URL
    : "http://localhost:5000/api",           // Local development API
  withCredentials: true,                     // Include cookies if needed
});

export default axiosInstance;
