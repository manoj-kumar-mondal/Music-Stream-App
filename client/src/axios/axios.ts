import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL_FOR_API_CALL;

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.response.use((res) => res, (err) => {
    return Promise.reject(err);
});
export default axiosInstance;