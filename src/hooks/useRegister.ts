import { useMutation } from "@tanstack/react-query";
import { UserRegistrationRequestDTO, registerApiClient } from "../api/AuthApiClient";
import { useSetAlerts } from "../components/alert/store";
import { useNavigate } from "react-router-dom";
import { AppError } from "../api/error";

const useRegister = () => {
  const { setSuccessAlert, setErrorAlert } = useSetAlerts();
  const navigate = useNavigate();
  
  return useMutation({
    mutationFn: (loginRequest: UserRegistrationRequestDTO) => registerApiClient.register(loginRequest),
    onSuccess: (response, _) => {
      if(response) {
        setSuccessAlert("Úspěšně vytvořen nový uživatelský účet.");
        navigate('/auth/login');
      }
    },
    onError: (error: AppError, _) => {
      setErrorAlert(error.localizedMessage);
    },
  });
}

export default useRegister;