import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CloseIcon from "@mui/icons-material/Close";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import {formatTimestamp} from "../../../utils/DateTimeUtils.ts";
import AccountAvatar from "../AccountAvatar.tsx";
import useAvailableContexts from "../../../hooks/useAvailableContexts.ts";
import {ContextUserDTO, UserContext} from "../../../entity/UserContext.ts";
import {CircularProgress, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {CenteredStack} from "../../ui/CenteredStack.tsx";
import {grey} from "@mui/material/colors";
import {useCurrentUserRequired} from "./store.ts";

interface AccountListProps {
    currentUser: UserContext;
    searchQuery: string;
    handleClose: (value: number) => void;
}

const AccountList = ({ currentUser, handleClose, searchQuery }: AccountListProps) => {
    const { data: contexts, isLoading } = useAvailableContexts();

    if(!contexts || isLoading) {
        return <CircularProgress color={'secondary'} />;
    }

    const filteredData = contexts.filter(context => context.fullName.toLowerCase().includes(searchQuery.toLowerCase()));

    if(filteredData.length === 0) {
        return (
            <Typography variant="subtitle1" color={grey[400]}>
                <i>Nebyl nalezen žádný kontext.</i>
            </Typography>
        );
    }

    return filteredData.map((contextUser) => (
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

interface Props {
    open: boolean;
    handleClose: (value: number) => void;
}

export const ChangeContextDialog = ({open, handleClose}: Props) => {
    const currentUser = useCurrentUserRequired();
    const [searchQuery, setSearchQuery] = useState("");

    if (!open && searchQuery) {
        setSearchQuery("");
    }

    const handleCloseDefault = () => {
        handleClose(currentUser.loggedAs.id);
    };

    return (
        <Dialog onClose={handleCloseDefault} open={open}
                PaperProps={{
                    sx: {
                        height: '75%',
                        maxHeight: '75%',
                    }
                }}>
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

            <DialogTitle id="scroll-dialog-title" marginX={12}>
                Vyberte nový kontext
            </DialogTitle>

            <DialogContent dividers sx={{ paddingX: 1, paddingY: 0 }}>
                <List sx={{ height: '57vh' }}>
                    <CenteredStack direction={'column'}>
                        <AccountList currentUser={currentUser} handleClose={handleClose} searchQuery={searchQuery}/>
                    </CenteredStack>
                </List>
            </DialogContent>

            <DialogActions>
                <TextField id="outlined-search" label="Vyhledat podle jména" type="search" sx={{width: '100%'}}
                           onChange={(event) => setSearchQuery(event.target.value)}
                />
            </DialogActions>

        </Dialog>
    )
};

function getRelationshipDescription(contextUser: ContextUserDTO, currentUser: UserContext) {
    if (contextUser.id === currentUser.id) {
        return "Vy";
    } else if(contextUser.activeFrom === null) {
        return "Administrátorský přístup"
    } else {

        const activeFromText = `Vztah aktivní od ${formatTimestamp(contextUser.activeFrom)}`;
        const activeToText = contextUser.activeTo != null ? ` do ${formatTimestamp(contextUser.activeTo)}` : "";

        return `${activeFromText}${activeToText}`;
    }
}