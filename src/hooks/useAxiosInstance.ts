import axios from "axios";

export const BASE_URL = 'http://localhost:8000/api/v1';
export const AUTH_TOKEN_STORAGE_KEY = 'access-token';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

if(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)) {
    axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export const useAxiosInstance = () => {
    return axiosInstance;
}