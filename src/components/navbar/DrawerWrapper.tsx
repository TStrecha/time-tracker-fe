import Box from "@mui/material/Box";
import {Drawer} from "@mui/material";
import {ReactNode} from "react";

interface Props {
    drawerWidth: number;
    children: ReactNode;
}

export const DrawerWrapper = ({ drawerWidth, children: drawer }: Props) => {
    return (
        <Box
            component="nav"
            sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="permanent"
                sx={{
                    display: {xs: 'none', sm: 'block'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
};