import {PageHeading} from "../../components/ui/PageHeading.tsx";
import {Box, Grid, Paper, Stack, Tab, Tabs} from "@mui/material";
import React from "react";
import {SettingsAvatar} from "../../components/settings/SettingsAvatar.tsx";
import {ChangePasswordSection} from "../../components/settings/ChangePasswordSection.tsx";
import {TwoFactorAuthenticationSection} from "../../components/settings/TwoFactorAuthenticationSection.tsx";
import {NotificationCentrum} from "../../components/settings/NotificationCentrum.tsx";
import {useNavigate, useParams} from "react-router-dom";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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

function a11yProps(tabName: string) {
    return {
        id: tabName,
    };
}

const INDEX_SECTION_NAME_MAPPING = ['details', 'billing', 'authorization'];
const DEFAULT_SECTION = INDEX_SECTION_NAME_MAPPING[0];

export const SettingsPage = () => {
    const navigate = useNavigate();
    const {section} = useParams();
    const value = INDEX_SECTION_NAME_MAPPING.indexOf(section ? section : DEFAULT_SECTION);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        navigate('/settings/' + INDEX_SECTION_NAME_MAPPING[newValue]);
    };

    return (
        <>
            <PageHeading>Nastavení</PageHeading>
            <Paper sx={{padding: 5}}>
                <Stack>
                    <Box sx={{marginRight: 'auto', marginLeft: 'auto'}}>
                        <Box>
                            <Tabs value={value} onChange={handleChange} textColor={'secondary'} indicatorColor={'secondary'} sx={{border: 'none'}}>
                                <Tab label="Detaily účtu" {...a11yProps("details")} />
                                <Tab label="Fakturace" {...a11yProps("billing")} />
                                <Tab label="Autorizace" {...a11yProps("authorization")} />
                            </Tabs>
                        </Box>
                    </Box>
                </Stack>
                <Box>

                    <CustomTabPanel value={value} index={0}>
                        <SettingsAvatar />
                        <Grid container spacing={10}>
                            <Grid item xs={6}>
                                <TwoFactorAuthenticationSection />
                                <ChangePasswordSection />
                            </Grid>
                            <Grid item xs={6}>
                                <NotificationCentrum />
                            </Grid>
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                    </CustomTabPanel>
                </Box>
            </Paper>
        </>
    );
};