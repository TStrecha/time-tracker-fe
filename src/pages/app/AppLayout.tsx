import Navbar from "../../components/navbar/Navbar.tsx";
import {Outlet} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {Logo} from "../../components/ui/Logo.tsx";
import Typography from "@mui/material/Typography";
import {CenteredStack} from "../../components/ui/CenteredStack.tsx";
import {Box, Breadcrumbs, Link, Stack} from "@mui/material";
import {useCurrentUserRequired} from "../../components/auth/context/store.ts";
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@mui/material/TextField";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

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

    const breadcrumbs = [
        <Stack alignItems="center" direction="row" gap={2}>
            <HomeIcon />
        </Stack>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/dashboard"
        >
            Přehled
        </Link>
    ];

    return (
        <Stack direction={'row'}>
            <CssBaseline/>
            <Box
                sx={{
                    width: '17%',
                    height: "100vh",
                    background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    color: 'white',
                }}
            >
                <Navbar user={currentUser}/>
            </Box>
            <Stack direction={'column'} paddingY={"1vh"} paddingX={11} spacing={2} sx={{width: '100%'}}>
                <Stack direction={'row'} sx={{width: '100%'}}>
                    <Box sx={{marginRight: 'auto', marginTop: 2}}>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Box>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '20vw'}} >
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField id="input-with-sx" label="Hledat v systému" variant="standard" fullWidth />
                        </Box>
                    </Box>
                </Stack>

                <Box>
                    <Outlet/>
                </Box>
            </Stack>
        </Stack>
    );
};