import {PageHeading} from "../../components/ui/PageHeading.tsx";
import {Box, Paper, Stack, Tab, Tabs, Tooltip} from "@mui/material";
import {useCurrentUserRequired} from "../../components/auth/context/store.ts";
import LockIcon from '@mui/icons-material/Lock';
import {red} from "@mui/material/colors";
import React, {useState} from "react";
import {SettingsAvatar} from "../../components/settings/SettingsAvatar.tsx";
import {ChangePasswordSection} from "../../components/settings/ChangePasswordSection.tsx";
import {TwoFactorAuthenticationSection} from "../../components/settings/TwoFactorAuthenticationSection.tsx";
import {TabPanelProps} from "@mui/lab";
import {NotificationCentrum} from "../../components/settings/NotificationCentrum.tsx";

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

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const SettingsPage = () => {
    const userContext = useCurrentUserRequired();
    const disabled = userContext.id != userContext.loggedAs.id
    const [value, setValue] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <PageHeading>Nastavení</PageHeading>
            <Paper sx={{padding: 5}}>
                <Stack>
                    <Box sx={{marginRight: 'auto', marginLeft: 'auto'}}>
                        <Box>
                            <Tabs value={value} onChange={handleChange} textColor={'secondary'} indicatorColor={'secondary'} sx={{border: 'none'}}>
                                <Tab label="Detaily účtu" {...a11yProps(0)} />
                                <Tab label="Fakturace" {...a11yProps(1)} />
                                <Tab label="Autorizace" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                    </Box>
                </Stack>
                <Box>

                    <CustomTabPanel value={value} index={0}>
                        <SettingsAvatar />
                        <Stack direction={'row'} spacing={3}>
                            <TwoFactorAuthenticationSection />
                            <NotificationCentrum />
                        </Stack>
                        <Stack direction={'row'} marginTop={2}>
                            <ChangePasswordSection />
                        </Stack>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Nastaveni 2
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Nastaveni 3
                    </CustomTabPanel>
                </Box>
            </Paper>
        </>
    );
};