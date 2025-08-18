import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.mode === "development" ? "https://fashion-ecommerce-brg1.onrender.com" : "/api",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
