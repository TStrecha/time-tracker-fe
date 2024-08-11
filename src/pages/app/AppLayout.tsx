import Navbar from "../../components/navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {Logo} from "../../components/ui/Logo.tsx";
import Typography from "@mui/material/Typography";
import {CenteredStack} from "../../components/ui/CenteredStack.tsx";
import {Box, Stack} from "@mui/material";
import {useCurrentUserRequired} from "../../components/auth/context/store.ts";
import {grey} from "@mui/material/colors";

const NAVBAR_BG_COLOR = "rgba(227,255,227,0.99)";
const NAVBAR_WIDTH = 275;
const FULL_HEIGHT = "100vh";
const BORDER_RADIUS = 40;

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
        <Stack direction={'row'}>

            <CssBaseline/>
            <Box
                sx={{
                    width: NAVBAR_WIDTH,
                    height: FULL_HEIGHT,
                    backgroundColor: NAVBAR_BG_COLOR,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                }}
            >
                <Navbar user={currentUser}/>
            </Box>
            <Box
                sx={{
                    width: 70,
                    height: FULL_HEIGHT,
                    backgroundColor: NAVBAR_BG_COLOR,
                }}
            >
            </Box>
            <Box
                sx={{
                    height: FULL_HEIGHT,
                    borderBottomLeftRadius: BORDER_RADIUS,
                    borderTopLeftRadius: BORDER_RADIUS,
                    left: NAVBAR_WIDTH - 5,
                    width: "calc(100% - "+ NAVBAR_WIDTH +"px)",
                    backgroundColor: grey[100],
                    position: "absolute",
                    paddingLeft: "40px",
                    paddingTop: "20px",
                    boxShadow: "-2px 0px 22px 0px rgba(87,87,87,0.4)",
                }}
            >
                <Outlet/>
            </Box>
        </Stack>
    );
};