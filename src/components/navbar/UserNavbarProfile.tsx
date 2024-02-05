import {CenteredStack} from "../ui/CenteredStack.tsx";
import {Avatar, Link} from "@mui/material";
import {green} from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import {UserContext} from "../../api/UserApiClient.ts";
import useChangeContext from "../../hooks/useChangeContext.ts";

export const UserNavbarProfile = ({ user }: { user: UserContext }) => {

    const {mutate: changeContext} = useChangeContext();

    return (
        <CenteredStack direction="column">
            <Avatar alt={user?.loggedAs.fullName} src="/static/images/avatar/1.jpg" sx={{bgcolor: green[500]}}/>
            <Typography variant={'h6'} paddingTop={1}>{user?.loggedAs.fullName}</Typography>
            {user?.loggedAs.id !== user?.id &&
                <Typography variant={'h6'} fontSize={11}>Spravujete jako
                    {' '}<Link color={'secondary'} sx={{cursor: 'pointer'}}
                               onClick={() => changeContext(user.id)}>{user?.fullName}</Link>
                </Typography>}
        </CenteredStack>
    );
};