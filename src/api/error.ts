import { AxiosError } from "axios";

export interface AppError {
    localizedMessage: string;
    status?: number;
    originalError: AxiosError;
}

interface InternalErrorDTO {
    exception: string;
    exceptionMessage: string;
    localizedMessage: string;
    entity: string;
}

export const convertAxiosError = (axiosError: AxiosError): AppError => {
    if(axiosError.code === "ERR_NETWORK") {
        return { localizedMessage: "Nepodařilo se připojit k serveru.", originalError: axiosError };
    }

    if(axiosError.response?.status === 500) {
        return { localizedMessage: "Nastala chyba na serveru.", status: axiosError.status, originalError: axiosError };
    }

    if(axiosError.response?.status === 400) {
        return { localizedMessage: "Neznámá chyba v datech.", status: axiosError.status, originalError: axiosError };
    }
    
    if(!axiosError?.response?.data) {
        return { localizedMessage: "Nastala neznámá chyba.", originalError: axiosError };
    }

    const data = axiosError.response.data as InternalErrorDTO

    if(data.localizedMessage) {
        return { localizedMessage: data.localizedMessage, status: axiosError.status, originalError: axiosError };
    } else {
        return { localizedMessage: 'Nastala neznámá chyba.', status: axiosError.status, originalError: axiosError };
    }
    
}