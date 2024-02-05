import { useMutation } from "@tanstack/react-query";
import { AppError } from "../api/error";
import { useSetAlerts } from "../components/alert/store";
import useAuthStore from "../components/auth/store";
import {useAxiosInstance} from "./useAxiosInstance.ts";

const useChangeContext = () => {
  const { setSuccessAlert, setErrorAlert } = useSetAlerts();

  const login = useAuthStore(store => store.login);
  const axiosInstance = useAxiosInstance();

  return useMutation({
    mutationFn: (id: number) => axiosInstance.put("/user/context", null, { params: {id: id} }).then(data => {
      return data.data;
    }),
    onSuccess: (response, _) => {
      if(response.success) {
        setSuccessAlert("Kontext byl změněn.");
        login(response.authToken, response.refreshToken);
      }

    },
    onError: (error: AppError, _) => {
      setErrorAlert(error.localizedMessage);
    }
  });
}

export default useChangeContext;