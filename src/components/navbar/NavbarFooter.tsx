import Box from "@mui/material/Box";
import {CenteredStack} from "../ui/CenteredStack.tsx";
import {ToolTippedIconButton} from "./ToolTippedIconButton.tsx";
import InfoIcon from '@mui/icons-material/Info';
import BugReportIcon from '@mui/icons-material/BugReport';
import TerminalIcon from '@mui/icons-material/Terminal';

export const NavbarFooter = () => {
    const dev = import.meta.env.DEV;

    return (
        <Box sx={{
            position: 'fixed',
            bottom: '1vh',
            paddingX: '5px',
        }}>
            <CenteredStack>
                <ToolTippedIconButton tooltipTitle={"Verze systému: 0.0.1"} Icon={InfoIcon} />
                <ToolTippedIconButton tooltipTitle={"Nahlásit chybu"} Icon={BugReportIcon} />
                {dev && <ToolTippedIconButton tooltipTitle={"Jste na DEV prostředí!"} Icon={TerminalIcon} color={'error'} /> }
            </CenteredStack>
        </Box>
    );
};