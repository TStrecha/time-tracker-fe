import {CenteredStack} from "../ui/CenteredStack.tsx";
import {Avatar, Link} from "@mui/material";
import Typography from "@mui/material/Typography";
import useChangeContext from "../../hooks/useChangeContext.ts";
import {UserContext} from "../../entity/UserContext.ts";

export const UserNavbarProfile = ({ user }: { user: UserContext }) => {

    const {mutate: changeContext} = useChangeContext();

    return (
        <CenteredStack direction="column">
            <Avatar alt={user?.loggedAs.fullName} src="/static/images/avatar/1.jpg" sx={{bgcolor: 'secondary.main'}}/>
            <Typography variant={'h6'} paddingTop={1}>{user?.loggedAs.fullName}</Typography>
            {user?.loggedAs.id !== user?.id &&
                <Typography variant={'h6'} fontSize={11}>Spravujete jako
                    {' '}<Link color={'secondary.main'} sx={{cursor: 'pointer'}}
                               onClick={() => changeContext(user.id)}>{user?.fullName}</Link>
                </Typography>}
        </CenteredStack>
    );
};