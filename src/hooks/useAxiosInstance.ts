import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import {ACCESS_TOKEN_STORAGE_KEY, fetchNewToken, logout, setAccessToken} from "../utils/AuthUtils.ts";

export const BASE_URL = 'https://devservertt.strechat.cz/api/v1';

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

setAccessToken(localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY));

export const refreshAuth = async (failedRequest: any) => {
    const newToken = await fetchNewToken();

    if (newToken) {
        failedRequest.response.config.headers.Authorization = "Bearer " + newToken;

        setAccessToken(newToken);

        return Promise.resolve(newToken);
    } else {
        logout();

        window.location.href = '/';

        return Promise.reject(new Error("Refreshing access token went wrong."));
    }
};

createAuthRefreshInterceptor(axiosInstance, refreshAuth, {
    statusCodes: [401, 403],
    pauseInstanceWhileRefreshing: true,
});

export const useAxiosInstance = () => {
    return axiosInstance;
}