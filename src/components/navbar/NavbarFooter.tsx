import Box from "@mui/material/Box";
import {CenteredStack} from "../ui/CenteredStack.tsx";
import {ToolTippedIconButton} from "./ToolTippedIconButton.tsx";
import InfoIcon from '@mui/icons-material/Info';

export const NavbarFooter = () => {
    return (

        <Box sx={{
            position: 'absolute',
            bottom: 0,
            paddingX: '5px',
            paddingBottom: '10px',
        }}>
            <CenteredStack>
                <ToolTippedIconButton tooltipTitle={"Verze systému: 0.0.1"} Icon={InfoIcon} placement={'right'}/>
            </CenteredStack>
        </Box>
    );
};