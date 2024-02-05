import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {ThemeProvider} from "@emotion/react";
import {CssBaseline, createTheme} from "@mui/material";
import {RouterProvider} from "react-router-dom";
import router from "./routes.tsx";
import AppAlert from "./components/alert/AppAlert.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {green, grey} from "@mui/material/colors";

const darkTheme = createTheme({
    palette: {
        mode: "light",
        secondary: {
            main: green[600]
        },
        background: {
            default: grey[100]
        }
    },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkTheme}>
                <AppAlert />
                <CssBaseline />
                <RouterProvider router={router} />
                <ReactQueryDevtools />
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
