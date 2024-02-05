import {CircularProgress} from "@mui/material";
import {Logo} from "./Logo.tsx";
import {CenteredStack} from "./CenteredStack.tsx";

export const AppLoading = () => {
    return (
        <CenteredStack direction={'column'} sx={{height: "100vh"}}>
            <Logo size={'l'}/>
            <CircularProgress color={"success"}/>
        </CenteredStack>
    );
};