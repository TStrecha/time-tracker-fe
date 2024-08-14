import {Avatar, Box, Stack, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import {orange} from "@mui/material/colors";

export const SettingsAvatar = () => {
    return (
        <Stack direction={'column'} marginBottom={4}>
            <Box sx={{pt: 0, marginLeft: 'auto', marginRight: 'auto'}}>
            <ListItem disableGutters sx={{pt: 0}}>
                <ListItemAvatar>
                    <Avatar alt={'Tomáš Střecha'} src="/static/images/avatar/1.jpg" sx={{bgcolor: 'secondary.main'}} />
                </ListItemAvatar>
                <Stack direction={'column'}>
                    <Stack direction={'row'}>
                        <Typography>
                            Tomáš Střecha {" "}
                        </Typography>
                        <IconButton aria-label="delete" size="small" sx={{marginTop: '-3px', marginLeft: '5px', color: orange[600]}}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>
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