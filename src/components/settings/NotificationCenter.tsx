import {Box, Stack, Switch, Typography} from "@mui/material";
import useAlertStore from "../alert/store.ts";
import Button from "@mui/material/Button";

interface NotificationSettingsProps {
    title: string;
    description: string;
    onSwitchChange: (on: boolean) => void;
}

export const NotificationCenter = () => {
    const {setSuccessAlert} = useAlertStore();

    return (
        <Box width={'100%'}>
            <Typography variant={'h5'} sx={{fontWeight: 'bold'}}>
                Notifikační centrum
            </Typography>

            <Stack direction={'column'} mt={5}>

                <NotificationSettings title={'Notifikace o nezaznamenané práci'}
                                      description={'V případě, že za den nezaznamenáte svůj čas strávený na úkolech, vám pošleme notifikaci o této události na email přesně minutu před půlnocí. A to na váš email.'}
                                      onSwitchChange={on => console.log('Notifikace o nezaznamenané práci: ' + on)} />

                <NotificationSettings title={'Notifikace o sestavení reportu'}
                                      description={'Oznámíme vám prostřednictvím emailu, pokud byl pro vás vystavený systémový report a rovnou vám ho zašleme v příloze pro další zpracování.'}
                                      onSwitchChange={on => console.log('Notifikace o nezaznamenané práci: ' + on)} />

                <NotificationSettings title={'Newsletter'}
                                      description={'V tomto speciálním emailu, který zasíláme zhruba každý měsíc, se dozvíte o novinkách ze systému TimeTrackeru. Také budete v obraze so se týče plánovaných novinek v systému.'}
                                      onSwitchChange={on => console.log('Notifikace o nezaznamenané práci: ' + on)} />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{color: 'white'}}
                    color={'secondary'}
                    onClick={() => setSuccessAlert("Preference notifikací byly uloženy.")}
                >
                    Uložit preference notifikací
                </Button>

            </Stack>
        </Box>
    );
};

const NotificationSettings = ({title, description, onSwitchChange}: NotificationSettingsProps) => {
    return (
        <Stack direction={'row'} mb={5}>
            <Box width={'75%'}>
                <Typography variant={'h5'}>
                    {title}
                </Typography>
                <Typography>
                    {description}
                </Typography>
            </Box>
            <Box width={'25%'} mt={'auto'} mb={'auto'}>
                <Switch defaultChecked color={'secondary'} onChange={event => onSwitchChange(event.target.checked)}/>
            </Box>
        </Stack>
    )
}