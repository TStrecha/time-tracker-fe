import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {CenteredStack} from "../ui/CenteredStack.tsx";

export const NavbarFooter = () => {
    return (

        <Box sx={{
            position: 'fixed',
            bottom: 0,
            paddingX: '5px',
            paddingBottom: '10px',
        }}>
            <CenteredStack>
                <Typography color={'gray'} variant="body2" paddingTop={'3px'}>Verze systému: 0.0.1</Typography>
            </CenteredStack>
        </Box>
    );
};