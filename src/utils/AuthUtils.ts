import {LoginResponseDTO} from "../api/AuthApiClient.ts";
import {axiosInstance} from "../hooks/useAxiosInstance.ts";
export const ACCESS_TOKEN_STORAGE_KEY = 'access-token';
export const REFRESH_TOKEN_STORAGE_KEY = 'refresh-token';

export const fetchNewToken = async () => {
    try {
        return await axiosInstance
            .post<LoginResponseDTO>("auth/refresh", localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY))
            .then(res => res.data.authToken);
    } catch (error) {
        return null;
    }
};

export const setAccessToken = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
    } else {
        delete axiosInstance.defaults.headers.Authorization;
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    }
}

export const setRefreshToken = (token: string | null) => {
    if (token) {
        localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
    } else {
        localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    }
};

export const login = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
}

export const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
}

export const isAuthorized = () => {
    return getAccessToken() != null;
}

export const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
}