import Navbar from "../../components/navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {Logo} from "../../components/ui/Logo.tsx";
import Typography from "@mui/material/Typography";
import {CenteredStack} from "../../components/ui/CenteredStack.tsx";
import {Box, Stack} from "@mui/material";
import {useCurrentUserRequired} from "../../components/auth/context/store.ts";
import {grey} from "@mui/material/colors";

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
                    width: 270,
                    height: "100vh",
                    backgroundColor: "rgba(232,255,232,0.99)",
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
                    height: "100vh",
                    backgroundColor: "rgba(232,255,232,0.99)",
                }}
            >
            </Box>
            <Box
                sx={{
                    height: "100vh",
                    borderBottomLeftRadius: 40,
                    borderTopLeftRadius: 50,
                    left: "265px",
                    width: "calc(100% - 270px)",
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