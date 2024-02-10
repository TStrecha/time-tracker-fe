import {AxiosInstance, AxiosRequestConfig} from "axios";
import { convertAxiosError } from "./error";
import { useAxiosInstance } from "../hooks/useAxiosInstance";

class BaseApiClient<T> {

    baseApiPath: string;
    apiClient: AxiosInstance;

    constructor(baseApiPath: string) {
        this.baseApiPath = baseApiPath;
        this.apiClient = useAxiosInstance();
    }
    
    get = (): Promise<T> => {
        return this.apiClient.get<T>(this.baseApiPath)
            .then(data => {
                return data.data;
            }).catch(error => {
                throw convertAxiosError(error);
            });
    }
    
    post = <B>(body: B): Promise<T> => {
        return this.apiClient.post<T>(this.baseApiPath, body)
            .then(data => {
                return data.data;
            }).catch(error => {
                throw convertAxiosError(error);
            });
    }
    
    // put = <B>(body: B): ServerResponse<T> => {
        
    // }
    
    getAll = (config: AxiosRequestConfig = {}): Promise<T[]> => {
        return this.apiClient.get<T[]>(this.baseApiPath, config)
            .then(data => {
                return data.data;
            }).catch(error => {
                throw convertAxiosError(error);
            });
    }
}

export default BaseApiClient;