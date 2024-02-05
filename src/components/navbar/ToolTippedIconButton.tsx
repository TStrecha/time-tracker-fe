import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";

interface Props {
    tooltipTitle: string;
    onClick?: () => void;
    Icon: React.ElementType;
}

export const ToolTippedIconButton = ({tooltipTitle, onClick = () => {}, Icon}: Props) => {
    return (
        <Tooltip title={tooltipTitle}>
            <IconButton aria-label={tooltipTitle} size="medium" color={'secondary'} onClick={onClick}>
                <Icon fontSize={'medium'}/>
            </IconButton>
        </Tooltip>
    );
};