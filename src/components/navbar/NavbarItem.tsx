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
            <ListItemButton onClick={() => navigate(path)} sx={{ paddingLeft: 5.5 }}>
                <ListItemIcon sx={{color: green[500], minWidth: "35px"}}>
                    <Icon/>
                </ListItemIcon>
                <ListItemText primary={title}/>

            </ListItemButton>
        </ListItem>
    );
};