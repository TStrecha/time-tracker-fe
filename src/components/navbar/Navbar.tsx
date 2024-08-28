import * as React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import {Alert, Box} from "@mui/material";
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
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import {grey} from "@mui/material/colors";
import {NavbarFooter} from "./NavbarFooter.tsx";
import "../../styles/navbar.css";

export default function Navbar({ user }: Readonly<{ user: UserContext }>) {
    const [isContextOpen, setContextOpen] = React.useState(false);
    const {setSuccessAlert} = useSetAlerts();
    const {mutate: changeContext} = useChangeContext();
    const navigate = useNavigate();

    return (
        <Box id={"navbar"}>
            <ChangeContextDialog open={isContextOpen}
                                 handleClose={value => {
                                     if (user?.loggedAs.id !== value) {
                                         changeContext(value);
                                     }
                                     setContextOpen(false);
                                 }}/>


            {
                user.role === 'ADMIN' &&
                <Alert severity="warning" sx={{borderRadius: 0}}>
                    Používáte administrátorský účet.
                </Alert>
            }

            <Toolbar/>
            <UserNavbarProfile user={user}/>

            <CenteredStack sx={{marginBottom: 3}}>

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

            <List sx={{marginTop: 2}}>
                <NavbarItem Icon={DashboardIcon} path={"/dashboard"}
                            isActive={location => location.pathname.startsWith("/dashboard")}>Přehled</NavbarItem>
                <NavbarItem Icon={AssignmentIcon} path={"/"} isActive={() => false}>Úkoly</NavbarItem>
                <NavbarItem Icon={AssessmentIcon} path={"/"} isActive={() => false}>Reporty</NavbarItem>
                <NavbarItem Icon={ReceiptIcon} path={"/"} isActive={() => false}>Fakturace</NavbarItem>
                <NavbarItem Icon={SettingsIcon} path={"/settings/details"}
                            isActive={location => location.pathname.startsWith("/settings")}>Nastavení</NavbarItem>
            </List>

            <NavbarFooter/>
        </Box>
    )
}