import Typography from "@mui/material/Typography";
import {ReactNode} from "react";

export const PageHeading = ({children: text}: { children: ReactNode }) => {
    return <Typography variant={'h4'} marginBottom={2}>{text}</Typography>
};