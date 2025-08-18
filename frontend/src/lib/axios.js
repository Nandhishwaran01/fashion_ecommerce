import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.mode === "production" ? "VITE_API_URL" : "/api",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
