import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "production" 
    ? `${import.meta.env.VITE_API_URL}/api`
    : "/api",
  withCredentials: true,
});

export default axiosInstance;