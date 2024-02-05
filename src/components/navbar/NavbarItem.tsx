import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {green} from "@mui/material/colors";
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
        <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(path)}>
                <ListItemIcon sx={{color: green[500]}}>
                    <Icon/>
                </ListItemIcon>
                <ListItemText primary={title}/>

            </ListItemButton>
        </ListItem>
    );
};