import {Avatar, Box, Input, Stack, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import {green, orange, red} from "@mui/material/colors";
import {useState} from "react";
import {useCurrentUserRequired} from "../auth/context/store.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

export const SettingsAvatar = () => {
    const user = useCurrentUserRequired().loggedAs;
    const [isEditing, setEditing] = useState(false);

    return (
        <Stack direction={'column'} marginBottom={4}>
            <Box sx={{pt: 0, marginLeft: 'auto', marginRight: 'auto'}}>
            <ListItem disableGutters sx={{pt: 0}}>
                <ListItemAvatar>
                    <Avatar alt={'Tomáš Střecha'} src="/static/images/avatar/1.jpg" sx={{bgcolor: 'secondary.main'}} />
                </ListItemAvatar>
                <Stack direction={'column'}>
                    <Stack direction={'row'}>
                        {!isEditing &&
                            <Typography>
                                {user.fullName} {" "}
                            </Typography>
                        }
                        {isEditing &&
                            <Input defaultValue={user.fullName} sx={{maxHeight: '25px'}}/>
                        }
                        {!isEditing &&
                            <IconButton aria-label="delete" size="small" sx={{marginTop: '-3px', marginLeft: '5px', color: orange[600]}} onClick={() => setEditing(true)}>
                                <EditIcon fontSize="inherit" />
                            </IconButton>
                        }
                        {isEditing &&
                            <>
                                <IconButton aria-label="delete" size="small" sx={{marginTop: '-3px', marginLeft: '5px', color: red[500]}} onClick={() => setEditing(false)}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" sx={{marginTop: '-3px', marginLeft: '5px', color: green[500]}} onClick={() => setEditing(false)}>
                                    <CheckIcon fontSize="inherit" />
                                </IconButton>
                            </>
                        }
                    </Stack>
                    <Typography>
                        Osobní účet
                    </Typography>
                </Stack>
            </ListItem>
            </Box>
        </Stack>
    );
};