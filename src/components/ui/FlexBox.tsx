import {ReactNode} from "react";
import Box from "@mui/material/Box";

interface Props {
    children: ReactNode;
}

export const FlexBox = ({ children }: Props) => {
    return (
        <Box sx={{display: 'flex'}}>
            {children}
        </Box>
    );
};