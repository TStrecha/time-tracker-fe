import { useMutation } from "@tanstack/react-query";
import { LoginRequestDTO, loginApiClient } from "../api/AuthApiClient";
import { AppError } from "../api/error";
import { useSetAlerts } from "../components/alert/store";
import useAuthStore from "../components/auth/store";

const useLogin = () => {
  const { setSuccessAlert, setErrorAlert } = useSetAlerts();

  const login = useAuthStore(store => store.login);

  return useMutation({
    mutationFn: (loginRequest: LoginRequestDTO) => loginApiClient.login(loginRequest),
    onSuccess: (response, _) => {
      if(response.success) {
        setSuccessAlert("Přihlášení proběhlo úspěšně.");
        login(response.authToken, response.refreshToken);
      }

    },
    onError: (error: AppError, _) => {
      setErrorAlert(error.localizedMessage);
    }
  });
}

export default useLogin;