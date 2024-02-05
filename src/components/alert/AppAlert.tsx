import { Alert, Snackbar } from "@mui/material";
import useAlertStore from "./store";

const AppAlert = () => {
  const { activeAlert, clearAlert } = useAlertStore();

  if (!activeAlert) {
    return null;
  }

  return (
      <Snackbar
          open={true}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
            severity={activeAlert.type}
            sx={{ width: "100%" }}
            onClose={() => clearAlert()}
        >
          {activeAlert.message}
        </Alert>
      </Snackbar>
  );
};

export default AppAlert;