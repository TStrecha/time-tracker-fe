import {Box, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useAlertStore from "../alert/store.ts";

export const ChangePasswordSection = () => {
    const {setSuccessAlert} = useAlertStore();

    return (
        <Box mt={6}>
            <Typography variant={'h5'} sx={{fontWeight: 'bold'}}>
                Změna hesla
            </Typography>
            <Box>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="current-password"
                    name="current-password"
                    label="Stávající heslo"
                    type="password"
                    autoComplete="current-password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="new-password"
                    name="new-password"
                    label="Nové heslo"
                    type="password"
                    autoComplete="current-password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="new-password-confirm"
                    name="new-password-confirm"
                    label="Potvrzení nového hesla"
                    type="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{color: 'white', mt: 3}}
                    color="secondary"
                    onClick={() => setSuccessAlert("Heslo bylo změněno.")}
                >
                    Změnit heslo
                </Button>
            </Box>
        </Box>
    );
};