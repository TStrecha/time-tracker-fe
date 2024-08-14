import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import React from "react";
import {OverridableStringUnion} from "@mui/types";
import {IconButtonPropsColorOverrides} from "@mui/material/IconButton/IconButton";

interface Props {
    tooltipTitle: string;
    onClick?: () => void;
    Icon: React.ElementType;
    color?: OverridableStringUnion<'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning', IconButtonPropsColorOverrides>;
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

export const ToolTippedIconButton = ({tooltipTitle, onClick = () => {}, Icon, placement = 'bottom', color = 'secondary'}: Props) => {
    return (
        <Tooltip title={tooltipTitle} placement={placement}>
            <IconButton aria-label={tooltipTitle} size="medium" color={color} onClick={onClick}>
                <Icon fontSize={'medium'}/>
            </IconButton>
        </Tooltip>
    );
};