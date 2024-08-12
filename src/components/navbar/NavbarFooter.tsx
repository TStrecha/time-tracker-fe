import Box from "@mui/material/Box";
import {CenteredStack} from "../ui/CenteredStack.tsx";
import {ToolTippedIconButton} from "./ToolTippedIconButton.tsx";
import InfoIcon from '@mui/icons-material/Info';
import BugReportIcon from '@mui/icons-material/BugReport';

export const NavbarFooter = () => {
    return (

        <Box sx={{
            position: 'absolute',
            bottom: '1vh',
            paddingX: '5px',
        }}>
            <CenteredStack>
                <ToolTippedIconButton tooltipTitle={"Verze systému: 0.0.1"} Icon={InfoIcon} />
                <ToolTippedIconButton tooltipTitle={"Nahlásit chybu"} Icon={BugReportIcon} />
            </CenteredStack>
        </Box>
    );
};