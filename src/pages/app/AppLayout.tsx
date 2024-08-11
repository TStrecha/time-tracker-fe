import Navbar from "../../components/navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {DrawerWrapper} from "../../components/navbar/DrawerWrapper.tsx";
import {FlexBox} from "../../components/ui/FlexBox.tsx";
import {Logo} from "../../components/ui/Logo.tsx";
import Typography from "@mui/material/Typography";
import {CenteredStack} from "../../components/ui/CenteredStack.tsx";
import {Box} from "@mui/material";
import {useCurrentUserRequired} from "../../components/auth/context/store.ts";

export const AppLayout = () => {
    const currentUser = useCurrentUserRequired();

    if (!currentUser) {
        return (
            <CenteredStack direction={'column'} sx={{ height: "100vh" }}>
                <Logo size={'l'}/>
                <Typography variant={"h4"}>Aplikace je v tuto chvíli nedostupná.</Typography>
            </CenteredStack>
        );
    }

    return (
            <FlexBox>
                <CssBaseline/>
                <DrawerWrapper drawerWidth={280}>
                        <Navbar user={currentUser} />
                </DrawerWrapper>
                <Box padding={2}>
                    <Outlet />
                </Box>
            </FlexBox>
    );
};