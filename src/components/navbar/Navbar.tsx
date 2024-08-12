import * as React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import {Alert} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {useNavigate} from "react-router-dom";
import { ChangeContextDialog } from "../auth/context/ChangeContextDialog.tsx";
import DashboardIcon from '@mui/icons-material/Dashboard';
import useChangeContext from "../../hooks/useChangeContext.ts";
import {useSetAlerts} from "../alert/store.ts";
import {ToolTippedIconButton} from "./ToolTippedIconButton.tsx";
import {CenteredStack} from "../ui/CenteredStack.tsx";
import {NavbarItem} from "./NavbarItem.tsx";
import AssignmentIcon from '@mui/icons-material/Assignment';
import {UserNavbarProfile} from "./UserNavbarProfile.tsx";
import {logout} from "../../utils/AuthUtils.ts";
import {UserContext} from "../../entity/UserContext.ts";
import useThemeStore from "../theme/store.ts";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {grey} from "@mui/material/colors";
import {NavbarFooter} from "./NavbarFooter.tsx";

export default function Navbar({ user }: Readonly<{ user: UserContext }>) {
    const [isContextOpen, setContextOpen] = React.useState(false);
    const {setSuccessAlert} = useSetAlerts();
    const {mutate: changeContext} = useChangeContext();
    const navigate = useNavigate();

    let theme = useThemeStore();
    let lightMode = theme.theme == 'light';
    let icon = lightMode ? LightModeIcon : DarkModeIcon;
    return (
        <div>
            <ChangeContextDialog open={isContextOpen}
                                 handleClose={value => {
                                     if (user?.loggedAs.id !== value) {
                                         changeContext(value);
                                     }
                                     setContextOpen(false);
                                 }}/>


            {
                user.role === 'ADMIN' &&
                <Alert severity="warning">
                    Používáte administrátorský účet.
                </Alert>
            }

            <Toolbar/>
            <UserNavbarProfile user={user}/>

            <CenteredStack sx={{ marginBottom: 3 }}>
                <ToolTippedIconButton tooltipTitle={"Přejít na " + (lightMode ? 'tmavý' : 'světlý') + " režim"}
                                      Icon={icon} onClick={() => theme.switchMode()}/>

                <ToolTippedIconButton tooltipTitle={"Změnit kontext"} Icon={ContactPageIcon} onClick={() => {
                    if (!isContextOpen) {
                        setContextOpen(true);
                    }
                }}/>
                <ToolTippedIconButton tooltipTitle={"Odhlásit se"} Icon={LogoutIcon} onClick={() => {
                    logout();
                    setSuccessAlert('Byl jste odhlášen ze systému.');
                    navigate("/auth/login");
                }}/>
            </CenteredStack>

            <Divider sx={{borderColor: grey[800]}}/>

            <List sx={{ marginTop: 2 }}>
                <NavbarItem Icon={DashboardIcon} path={"/dashboard"}>Přehled</NavbarItem>
                <NavbarItem Icon={AssignmentIcon} path={"/dashboard"}>Úkoly</NavbarItem>
                <NavbarItem Icon={AssessmentIcon} path={"/dashboard"}>Reporty</NavbarItem>
                <NavbarItem Icon={ReceiptIcon} path={"/dashboard"}>Fakturace</NavbarItem>
                <NavbarItem Icon={AccountBoxIcon} path={"/settings"}>Můj profil</NavbarItem>
            </List>

            <NavbarFooter/>
        </div>
    );
}