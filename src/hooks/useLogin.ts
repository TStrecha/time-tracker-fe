import { useMutation } from "@tanstack/react-query";
import { LoginRequestDTO, loginApiClient } from "../api/AuthApiClient";
import { AppError } from "../api/error";
import { useSetAlerts } from "../components/alert/store";
import {login} from "../utils/AuthUtils.ts";
import {useNavigate} from "react-router-dom";

const useLogin = () => {
  const { setSuccessAlert, setErrorAlert } = useSetAlerts();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (loginRequest: LoginRequestDTO) => loginApiClient.login(loginRequest),
    onSuccess: (response, _) => {
      if(response.success) {
        setSuccessAlert("Přihlášení proběhlo úspěšně.");
        login(response.authToken, response.refreshToken);
        navigate("/dashboard")
      }

    },
    onError: (error: AppError, _) => {
      setErrorAlert(error.localizedMessage);
    }
  });
}

export default useLogin;