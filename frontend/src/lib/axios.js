import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "production"
    ? "/api" // Production API URL

  : {
      withCredentials: true,
    }       
                    
});

export default axiosInstance;
