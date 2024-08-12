import {ThemeProvider} from "@emotion/react";
import AppAlert from "./components/alert/AppAlert.tsx";
import {createTheme, CssBaseline} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import router from "./routes.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {green, grey} from "@mui/material/colors";
import useThemeStore from "./components/theme/store.ts";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        secondary: {
            main: green[500]
        },
        background: {
            paper: grey[100],
            default: "#f0f2f5",
        }
    },
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        secondary: {
            main: green[500]
        },
        background: {
            default: grey[800],
            paper: grey[900],
        }
    },
});

const getDesignTokens = (mode: 'light' | 'dark') => {
    if(mode == 'light') {
        return lightTheme;
    } else {
        return darkTheme;
    }
}

export const App = () => {
    let theme = useThemeStore(store => store.theme);
    let muiTheme = getDesignTokens(theme);

    return (
        <ThemeProvider theme={muiTheme}>
            <AppAlert />
            <CssBaseline />
            <RouterProvider router={router} />
            <ReactQueryDevtools />
        </ThemeProvider>
    );
};