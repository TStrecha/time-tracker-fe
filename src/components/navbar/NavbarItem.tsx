import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {useNavigate} from "react-router-dom";
import React from "react";

interface Props {
    children: string;
    Icon: React.ElementType;
    path: string
}

export const NavbarItem = ({ children: title, Icon, path }: Props) => {
    const navigate = useNavigate();

    return (
        <ListItem disablePadding sx={{paddingX: 4}}>
            <ListItemButton onClick={() => navigate(path)} sx={{ paddingLeft: 2, borderRadius: 2 }}>
                <ListItemIcon sx={{color: 'secondary.main', minWidth: "50px"}}>
                    <Icon fontSize={'medium'}/>
                </ListItemIcon>
                <ListItemText primary={title} />

            </ListItemButton>
        </ListItem>
    );
};