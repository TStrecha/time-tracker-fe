import { useMutation } from "@tanstack/react-query";
import { AppError } from "../api/error";
import { useSetAlerts } from "../components/alert/store";
import {useAxiosInstance} from "./useAxiosInstance.ts";
import {login} from "../utils/AuthUtils.ts";
import {useContextStore} from "../components/auth/context/store.ts";

const useChangeContext = () => {
  const { setSuccessAlert, setErrorAlert } = useSetAlerts();
  const axiosInstance = useAxiosInstance();
  const reloadContext = useContextStore(store => store.reload);

  return useMutation({
    mutationFn: (id: number) => axiosInstance.put("/user/context", null, { params: {id: id} }).then(data => {
      return data.data;
    }),
    onSuccess: (response, _) => {

      if(response.success) {
        setSuccessAlert("Kontext byl změněn.");
        login(response.authToken, response.refreshToken);
        reloadContext();
      }

    },
    onError: (error: AppError, _) => {
      setErrorAlert(error.localizedMessage);
    }
  });
}

export default useChangeContext;