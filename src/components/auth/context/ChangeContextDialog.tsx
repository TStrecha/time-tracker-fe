
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CloseIcon from "@mui/icons-material/Close";
import ListItemText from "@mui/material/ListItemText";
import {ContextUserDTO, UserContext} from "../../../api/UserApiClient.ts";
import IconButton from "@mui/material/IconButton";
import {formatTimestamp} from "../../../utils/DateTimeUtils.ts";
import AccountAvatar from "../AccountAvatar.tsx";

interface Props {
    currentUser: UserContext;
    open: boolean;
    handleClose: (value: number) => void;
}

const AccountList = ({currentUser, handleClose}: Props) => {
    return currentUser.relationshipsReceiving.map((contextUser) => (
        <ListItem disableGutters key={contextUser.id} sx={{pt: 0}}>
            <ListItemButton onClick={() => handleClose(contextUser.id)}>
                <ListItemAvatar>
                    <AccountAvatar accountType={contextUser.accountType} />
                </ListItemAvatar>
                <ListItemText primary={contextUser.fullName}
                              secondary={getRelationshipDescription(contextUser, currentUser)}
                />
            </ListItemButton>
        </ListItem>
    ));
};

export const ChangeContextDialog = ({currentUser, open, handleClose}: Props) => {

    const handleCloseDefault = () => {
        handleClose(currentUser.loggedAs.id);
    };

    return (
        <Dialog onClose={handleCloseDefault} open={open}>
            <IconButton
                aria-label="close"
                onClick={handleCloseDefault}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <CloseIcon/>
            </IconButton>
            <Box marginBottom={2}>
                <Typography textAlign={"center"} variant={'h5'} marginTop={3} marginX={10}>
                    Vyberte nový kontext
                </Typography>
            </Box>

            <List>
                <AccountList currentUser={currentUser} open={open} handleClose={handleClose}/>
            </List>

        </Dialog>
    )
};

function getRelationshipDescription(contextUser: ContextUserDTO, currentUser: UserContext) {
    if (contextUser.id === currentUser.id) {
        return "Vy";
    } else {

        const activeFromText = `Vztah aktivní od ${formatTimestamp(contextUser.activeFrom)}`;
        const activeToText = contextUser.activeTo != null ? ` do ${formatTimestamp(contextUser.activeTo)}` : "";

        return `${activeFromText}${activeToText}`;
    }
}