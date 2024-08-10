import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import { Avatar } from "@mui/material";
import { green } from "@mui/material/colors";
import {AccountTypes} from "../../entity/UserContext.ts";

const accountTypes = {
    PERSON: PersonIcon,
    COMPANY: BusinessIcon,
} as const;

interface Props {
    accountType: AccountTypes;
}

const avatarStyling = {
    bgcolor: green[100],
    color: green[600]
};

const AccountAvatar = ({ accountType }: Props) => {
    const Icon = accountTypes[accountType];

    return (
        <Avatar sx={ avatarStyling }>
            <Icon />
        </Avatar>
    );
};

export default AccountAvatar;