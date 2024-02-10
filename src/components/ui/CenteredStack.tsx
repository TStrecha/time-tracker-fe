import {Stack} from "@mui/material";
import {ReactNode} from "react";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles/createTheme";

interface Props {
    children: ReactNode;
    direction?: 'row' | 'column';
    fullHeight?: boolean;
    sx?: SxProps<Theme>;
}

export const CenteredStack = ({direction = 'row',  children, fullHeight = false, sx = {} }: Props) => {
    return (
        <Stack direction={direction} alignItems="center" justifyContent={'center'} marginBottom={0.5} sx={sx} height={fullHeight ? '100%' : 'auto'}>
            {children}
        </Stack>
    );
};