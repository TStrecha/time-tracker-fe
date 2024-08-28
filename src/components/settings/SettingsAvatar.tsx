import {Avatar, Box, Stack, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {useCurrentUserRequired} from "../auth/context/store.ts";
import {InlinedEditable} from "../ui/InlinedEditable.tsx";
import {z} from "zod";

export const SettingsAvatar = () => {
    const user = useCurrentUserRequired().loggedAs;

    return (
        <Stack direction={'column'} marginBottom={4}>
            <Box sx={{pt: 0, marginLeft: 'auto', marginRight: 'auto'}}>
                <ListItem disableGutters sx={{pt: 0}}>

                    <ListItemAvatar>
                        <Avatar alt={user.fullName} src="/static/images/avatar/1.jpg" sx={{bgcolor: 'secondary.main'}}/>
                    </ListItemAvatar>

                    <Stack direction={'column'}>

                        <InlinedEditable text={user.fullName}
                                         onSubmit={(value) => console.log("User name change requested: " + value)}
                                         validator={
                                             z.string()
                                                 .min(5)
                                         } />

                        <Typography>
                            {user.accountType == "PERSON" ? "Osobní" : "Firemní"} {" "} účet
                        </Typography>

                    </Stack>

                </ListItem>
            </Box>
        </Stack>
    );
};