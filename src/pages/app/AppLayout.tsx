import Navbar from "../../components/navbar/Navbar.tsx";
import {Navigate, Outlet} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {DrawerWrapper} from "../../components/navbar/DrawerWrapper.tsx";
import {FlexBox} from "../../components/ui/FlexBox.tsx";
import useCurrentUser from "../../hooks/useCurrentUser.ts";
import {Logo} from "../../components/ui/Logo.tsx";
import Typography from "@mui/material/Typography";
import {AppLoading} from "../../components/ui/AppLoading.tsx";
import useAuthStore from "../../components/auth/store.ts";
import {CenteredStack} from "../../components/ui/CenteredStack.tsx";
import {Box} from "@mui/material";
import {useSetAlerts} from "../../components/alert/store.ts";
import {AppError} from "../../api/error.ts";

export const AppLayout = () => {
    const accessToken = useAuthStore((store) => store.accessToken);
    const { setErrorAlert } = useSetAlerts();

    if (!accessToken) {
        setErrorAlert("Pro tuto akci je nutné se přihlásit.");
        return <Navigate to={"/auth/login"} />;
    }

    const {data: currentUser, error, isLoading} = useCurrentUser();
    const logout = useAuthStore(store => store.logout);

    if (error) {
        if ((error as unknown as AppError).originalError?.response?.status === 401) {
            logout();
            return <Navigate to={"/auth/login"}/>;
        }
        return (
            <CenteredStack direction={'column'} sx={{ height: "100vh" }}>
                <Logo size={'l'}/>
                <Typography variant={"h4"}>Aplikace je v tuto chvíli nedostupná.</Typography>
            </CenteredStack>
        );
    }

    if (isLoading || !currentUser) {
        return <AppLoading/>
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