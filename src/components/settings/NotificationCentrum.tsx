import {Box, Stack, Switch, Typography} from "@mui/material";

export const NotificationCentrum = () => {
    return (
        <Box width={'100%'}>
            <Typography variant={'h5'} sx={{fontWeight: 'bold'}}>
                Notifikační centrum
            </Typography>
            <Stack direction={'column'} mt={5}>
                <Stack direction={'row'} mb={5}>
                    <Box width={'75%'}>
                        <Typography variant={'h5'}>
                            Notifikace o nezaznamenané práci
                        </Typography>
                        <Typography>
                            V případě, že za den nezaznamenáte svůj čas strávený na úkolech, vám pošleme notifikaci o této události na email přesně minutu před půlnocí. A to na váš email.
                        </Typography>
                    </Box>
                    <Box width={'25%'} mt={'auto'} mb={'auto'}>
                        <Switch defaultChecked color={'secondary'}/>
                    </Box>
                </Stack>
                <Stack direction={'row'} mb={5}>
                    <Box width={'75%'}>
                        <Typography variant={'h5'}>
                            Notifikace o sestavení reportu
                        </Typography>
                        <Typography>
                            Oznámíme vám prostřednictvím emailu, pokud byl pro vás vystavený systémový report a rovnou vám ho zašleme v příloze pro další zpracování.
                        </Typography>
                    </Box>
                    <Box width={'25%'} mt={'auto'} mb={'auto'}>
                        <Switch defaultChecked color={'secondary'}/>
                    </Box>
                </Stack>
                <Stack direction={'row'}>
                    <Box width={'75%'}>
                        <Typography variant={'h5'}>
                            Newsletter
                        </Typography>
                        <Typography>
                            V tomto speciálním emailu, který zasíláme zhruba každý měsíc, se dozvíte o novinkách ze systému TimeTrackeru. Také budete v obraze so se týče plánovaných novinek v systému.
                        </Typography>
                    </Box>
                    <Box width={'25%'} mt={'auto'} mb={'auto'}>
                        <Switch defaultChecked color={'secondary'}/>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};