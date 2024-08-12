import {PageHeading} from "../../components/ui/PageHeading.tsx";
import {Box, Card, CardActionArea, CardContent, Paper, Stack, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {useCurrentUserRequired} from "../../components/auth/context/store.ts";
import LockIcon from '@mui/icons-material/Lock';
import {green, red} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {Add} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

export const DetailLock = ({ shown }: { shown: boolean }) => {
    if (!shown) {
        return null;
    }

    return (
        <Tooltip title={'Detaily účtu může upravovat pouze vlastník účtu.'}>
            <LockIcon sx={{color: red[800], fontSize: '20px', paddingBottom: '5px'}}/>
        </Tooltip>
    );
}

export const SettingsPage = () => {
    const userContext = useCurrentUserRequired();
    const disabled = userContext.id != userContext.loggedAs.id
    const navigate = useNavigate();

    return (
        <>
            <PageHeading>Nastavení účtu {userContext.loggedAs.fullName}</PageHeading>
            <Stack direction={'row'}>
                <Paper elevation={1} sx={{padding: 1.5, width: '25%', marginRight: '25px' }}>
                    <Box>
                        <Typography variant={'h6'} marginBottom={2}><b>Detaily účtu</b> <DetailLock shown={disabled}/></Typography>
                    {userContext.loggedAs.accountType == "PERSON" && (
                        <>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="firstName"
                                label="Křestní jméno"
                                type="text"
                                id="firstName"
                                value={userContext.loggedAs.firstName}
                                disabled={disabled}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="lastName"
                                label="Příjmení"
                                type="lastName"
                                id="lastName"
                                value={userContext.loggedAs.lastName}
                                disabled={disabled}
                            />
                        </>
                    )}
                    {userContext.loggedAs.accountType == "COMPANY" && (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="companyName"
                            label="Název firmy"
                            type="text"
                            id="companyName"
                            value={userContext.loggedAs.companyName}
                            disabled={disabled}
                        />
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="Emailová adresa"
                        type="email"
                        id="email"
                        value={userContext.loggedAs.email}
                        disabled={disabled}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Heslo pro ověření"
                        type="password"
                        id="password"
                        disabled={disabled}
                    />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            color="success"
                            disabled={disabled}
                        >
                            Uložit
                        </Button>
                    </Box>
                </Paper>
                <Paper elevation={1} sx={{width: '25%',  padding: 1.5 }}>
                        <Stack justifyContent={'space-between'} direction={'row'}  marginBottom={2}>
                            <Typography variant={'h6'}><b>Nastavení účtu</b></Typography>
                            <Button
                                startIcon={<Add />}
                                type="submit"
                                color="success"
                            >
                                Přidat
                            </Button>
                        </Stack>
                    <Box sx={{ maxHeight: '500px', overflow: 'auto', paddingX: 2 }} >
                    <Card sx={{ minWidth: 275, borderLeft: 10, borderColor: green[600], marginBottom: 2 }}>
                        <CardActionArea onClick={() => navigate("/settings/1") }>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Nazev aktivniho nastaveni
                                </Typography>
                                <Typography variant="body2">
                                    Aktivní od 1.1.2024
                                </Typography>
                                <Typography variant="body2" color={"gray"}>
                                    Poznamka uzivatele k tomuto nastaveni
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card sx={{ minWidth: 275, borderLeft: 10, borderColor: red[600], marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Nazev neaktivniho nastaveni
                            </Typography>
                            <Typography variant="body2">
                                Aktivní od 1.1.2022 do 31.12.2023
                            </Typography>
                            <Typography variant="body2" color={"gray"}>
                                Poznamka uzivatele
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275, borderLeft: 10, borderColor: red[600], marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Nazev neaktivniho nastaveni
                            </Typography>
                            <Typography variant="body2">
                                Aktivní od 1.1.2022 do 31.12.2023
                            </Typography>
                            <Typography variant="body2" color={"gray"}>
                                Poznamka uzivatele
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275, borderLeft: 10, borderColor: red[600], marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Nazev neaktivniho nastaveni
                            </Typography>
                            <Typography variant="body2">
                                Aktivní od 1.1.2022 do 31.12.2023
                            </Typography>
                            <Typography variant="body2" color={"gray"}>
                                Poznamka uzivatele
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275, borderLeft: 10, borderColor: red[600], marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Nazev neaktivniho nastaveni
                            </Typography>
                            <Typography variant="body2">
                                Aktivní od 1.1.2022 do 31.12.2023
                            </Typography>
                            <Typography variant="body2" color={"gray"}>
                                Poznamka uzivatele
                            </Typography>
                        </CardContent>
                    </Card>
                    </Box>
                </Paper>

            </Stack>
        </>
    );
};