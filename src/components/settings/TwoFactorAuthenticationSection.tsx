import {Box, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography} from "@mui/material";
import '../../styles/settings.css';
import Button from "@mui/material/Button";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import qrcode from '../../../public/qrcode-example.png';
import {useSetAlerts} from "../alert/store.ts";
import TextField from "@mui/material/TextField";

interface CommonDialogProps {
    open: boolean;
    twoFaActive: boolean;
    onClose: () => void;
}

type ConfirmationDialogProps = CommonDialogProps & {
    onCancelButtonClick: () => void;
    onContinueToActivationButtonClick: () => void;
}

type SetupDialogProps = CommonDialogProps & {
    onContinueToCheckButtonClick: () => void;
}

type CheckDialogProps = CommonDialogProps & {
    onBackButtonClick: () => void;
    onActivateButtonClick: () => void;
}


export const TwoFactorAuthenticationSection = () => {
    const [twoFaActive, setTwoFaActive] = useState(false);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [setupDialogOpen, setSetupDialogOpen] = useState(false);
    const [checkDialogOpen, setCheckDialogOpen] = useState(false);
    const {setSuccessAlert} = useSetAlerts();

    const dotClass = twoFaActive ? "dot-active" : "dot-inactive";

    return (
        <>
            <ConfirmationDialog twoFaActive={twoFaActive}
                                open={confirmationDialogOpen}
                                onClose={() => setConfirmationDialogOpen(false)}
                                onCancelButtonClick={() => {
                                    setTwoFaActive(false);
                                    setSuccessAlert("Deaktivace 2FA proběhla úspěšně.");
                                    setConfirmationDialogOpen(false);
                                }}
                                onContinueToActivationButtonClick={() => {
                                    setConfirmationDialogOpen(false);
                                    setSetupDialogOpen(true);
                                }}/>

            <SetupDialog twoFaActive={twoFaActive}
                         open={setupDialogOpen}
                         onClose={() => setSetupDialogOpen(false)}
                         onContinueToCheckButtonClick={() => {
                             setSetupDialogOpen(false);
                             setCheckDialogOpen(true);
                         }}/>

            <CheckDialog twoFaActive={twoFaActive}
                         open={checkDialogOpen}
                         onClose={() => setCheckDialogOpen(false)}
                         onBackButtonClick={() => {
                             setCheckDialogOpen(false);
                             setSetupDialogOpen(true);
                         }}
                         onActivateButtonClick={() => {
                             setTwoFaActive(true);
                             setSuccessAlert("Aktivace 2FA proběhla úspěšně.");

                             setCheckDialogOpen(false);
                         }}/>

            <Box width={'100%'}>
                <Stack direction={'row'}>
                    <Typography variant={'h5'} sx={{fontWeight: 'bold'}}>
                        Dvoufaktorové ověření
                    </Typography>

                    <Stack direction={'row'} paddingLeft={2}>
                        <img src={"../circle.svg"} alt={""} width={15} height={15} className={dotClass}
                             style={{marginTop: '8px'}}/>

                        <Typography paddingTop={'5px'}
                                    paddingLeft={'5px'}>
                            {twoFaActive ? 'Aktivní' : 'Neaktivní'}
                        </Typography>
                    </Stack>
                </Stack>
                <Typography>
                    Dvoufaktorové ověření (2FA) vám výrazně zvýší bezpečnost účtu. I když někdo zjistí vaše heslo, bez
                    druhého faktoru – kódu na vašem telefonu – se do účtu nedostane. Tento jednoduchý krok vám pomůže
                    chránit vaše osobní údaje a citlivé informace před zneužitím.
                </Typography>
                <br/>
                <Typography style={{fontWeight: 'bold'}}>
                    {twoFaActive ?
                        "Dvoufaktorové ověření již máte aktivní. Děkujeme, že si chráníte účet." :
                        "V tuto chvíli nemáte aktivní dvoufaktorové ověření. Doporučujeme si ho zaktivovat tlačítkem níže."
                    }
                </Typography>
                <br/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{color: 'white'}}
                    color={twoFaActive ? "error" : "secondary"}
                    onClick={() => setConfirmationDialogOpen(true)}
                >
                    {twoFaActive ? "Deaktivovat" : "Aktivovat"} dvoufaktorové ověření
                </Button>
            </Box>
        </>
    );
};

const ConfirmationDialog = ({open, twoFaActive, onClose, onCancelButtonClick, onContinueToActivationButtonClick}: ConfirmationDialogProps) => {
    return (
        <Dialog
            onClose={onClose}
            open={open}
        >
            <DialogTitle sx={{m: 0, p: 2}}>
                {twoFaActive ? "Deaktivace" : "Aktivace"} dvoufaktorové ověření
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon/>
            </IconButton>
            <DialogContent dividers>
                {twoFaActive &&
                    <>
                        <Typography gutterBottom>
                            Opravdu si přejete zrušit dvoufaktorové ověření? Váš účet bude jednodušeji napadnutelný.
                        </Typography>
                        <Typography gutterBottom marginTop={2}>
                            Dvoufázové ověření si můžete kdykoliv vrátit zpět stejným postupem, jako minule.
                        </Typography>
                    </>
                }

                {!twoFaActive &&
                    <>
                        <Typography gutterBottom>
                            Právě se chystáte zaktivovat dvoufaktorové ověření vašeho účtu. Tím váš účet bude více v
                            bezpečí.
                            Aktivace trvá zhruba minutu a je velmi jednoduchá. K aktivaci budete potřebovat pouze
                            mobilní
                            telefon.
                        </Typography>
                        <Typography gutterBottom marginTop={2}>
                            Veškerý postup naleznete v dalším kroku.
                        </Typography>
                    </>
                }
            </DialogContent>
            <DialogActions>
                {twoFaActive &&
                    <Button onClick={onCancelButtonClick} color={'error'}>
                        Zrušit
                    </Button>
                }

                {!twoFaActive &&
                    <Button onClick={onContinueToActivationButtonClick} color='secondary'>
                        Pokračovat k aktivaci
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
}

const SetupDialog = ({open, twoFaActive, onClose, onContinueToCheckButtonClick}: SetupDialogProps) => {
    return (
        <Dialog
            onClose={onClose}
            open={open}
        >
            <DialogTitle sx={{m: 0, p: 2}}>
                {twoFaActive ? "Deaktivace" : "Aktivace"} dvoufaktorové ověření
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon/>
            </IconButton>
            <DialogContent dividers>
                <Typography gutterBottom marginTop={1}>
                    <b>Krok 1:</b> Pro dvoufaktorové ověření používáme službu Google Authenticator. Abyste správně
                    napojili svůj účet, prosím, stáhněte si do svého mobilního telefonu
                    aplikaci Google Authenticator pomocí jednoho z těchto odkazů
                </Typography>
                <Typography gutterBottom marginTop={3}>
                    <b>Krok 2:</b> V dolní pravé části obrazovky klikněte na tlačítko s ikonou <b>+</b> a zvolte možnost
                    načíst QR kód. Kamerou načtěte následující QR kód
                </Typography>
                <img src={qrcode} width={250}/>
                <Typography gutterBottom marginTop={3}>
                    <b>Krok 3:</b> Na hlavní stránce v aplikaci by se měl zobrazit jednorázový, časově omezený kód pod
                    názvem naší aplikace "TimeTracker". Pokud kód vidíte,
                    pokračujte na ověření.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onContinueToCheckButtonClick} color='secondary'>
                    Pokračovat k ověření
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const CheckDialog = ({open, twoFaActive, onClose, onBackButtonClick, onActivateButtonClick}: CheckDialogProps) => {
    return (
        <Dialog
            onClose={onClose}
            open={open}
        >
            <DialogTitle sx={{m: 0, p: 2}}>
                {twoFaActive ? "Deaktivace" : "Aktivace"} dvoufaktorové ověření
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon/>
            </IconButton>
            <DialogContent dividers>
                <Typography gutterBottom mt={1}>
                    Prosím, zadejte svůj jednorázový autorizační kód z aplikace k dokončení celého procesu.
                </Typography>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Jednorázový kód"
                    type="text"
                    fullWidth
                    variant="standard"
                    sx={{mb: 3}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onBackButtonClick} color='primary'>
                    Zpět
                </Button>
                <Button onClick={onActivateButtonClick} color='secondary'>
                    Aktivovat
                </Button>
            </DialogActions>
        </Dialog>
    );
}