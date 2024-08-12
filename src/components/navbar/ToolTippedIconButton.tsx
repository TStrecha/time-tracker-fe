import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";

interface Props {
    tooltipTitle: string;
    onClick?: () => void;
    Icon: React.ElementType;
    placement?: | 'bottom-end'
        | 'bottom-start'
        | 'bottom'
        | 'left-end'
        | 'left-start'
        | 'left'
        | 'right-end'
        | 'right-start'
        | 'right'
        | 'top-end'
        | 'top-start'
        | 'top';
}

export const ToolTippedIconButton = ({tooltipTitle, onClick = () => {}, Icon, placement = 'bottom'}: Props) => {
    return (
        <Tooltip title={tooltipTitle} placement={placement}>
            <IconButton aria-label={tooltipTitle} size="medium" color={'secondary'} onClick={onClick}>
                <Icon fontSize={'medium'}/>
            </IconButton>
        </Tooltip>
    );
};