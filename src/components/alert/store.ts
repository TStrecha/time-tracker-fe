import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface Alert {
    type: "success" | "error";
    message: string;
}

interface AlertStore {
    activeAlert?: Alert;
    clearAlert: () => void;
    setAlert: (alert: Alert) => void;
    setErrorAlert: (message: string) => void;
    setSuccessAlert: (message: string) => void;
}

const updateState = (set: any, newValue: any) => {
    set((state: any) => ({
        ...state,
        activeAlert: newValue,
    }));
}

const useAlertStore = create<AlertStore>((set) => ({
    activeAlert: undefined,
    clearAlert: () => updateState(set, undefined),
    setAlert: (alert: Alert) => updateState(set, alert),
    setErrorAlert: (message: string) => updateState(set, { type: "error", message }),
    setSuccessAlert: (message: string) => updateState(set, { type: "success", message }),
}));

export const useSetAlerts = () => {
    const setErrorAlert = useAlertStore((store) => store.setErrorAlert);
    const setSuccessAlert = useAlertStore((store) => store.setSuccessAlert);

    return { setSuccessAlert, setErrorAlert };
};

mountStoreDevtool("AppAlert store", useAlertStore);

export default useAlertStore;