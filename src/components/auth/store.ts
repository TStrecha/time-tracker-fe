import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { useAxiosInstance } from "../../hooks/useAxiosInstance";

interface AuthStore {
    accessToken?: string;
    refreshToken?: string;

    setAccessToken: (accessToken?: string) => void;
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthStore>(set => ({
    accessToken: localStorage.getItem('access-token')!,
    refreshToken: localStorage.getItem('refresh-token')!,

    setAccessToken: (accessToken?: string) => set(store => {
        const axiosInstance = useAxiosInstance();

        if(accessToken) {
            localStorage.setItem('access-token', accessToken);
            axiosInstance.defaults.headers.Authorization = 'Bearer ' + accessToken;
        } else {
            localStorage.removeItem('access-token');
            axiosInstance.defaults.headers.Authorization = null;
        }

        return { ...store, accessToken: accessToken }
    }),

    login: (accessToken: string, refreshToken: string) => set(store => {
        store.setAccessToken(accessToken);
        localStorage.setItem('refresh-token', refreshToken);

        return { ...store, accessToken: accessToken, refreshToken: refreshToken }
    }),

    logout: () => set(store => {
        store.setAccessToken(undefined);
        localStorage.removeItem('refresh-token');

        return {...store, accessToken: undefined, refreshToken: undefined }
    }),
}));

mountStoreDevtool("Auth store", useAuthStore);

export default useAuthStore;