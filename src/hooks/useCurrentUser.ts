import {getAccessToken} from "../utils/AuthUtils.ts";
import {jwtDecode} from "jwt-decode";
import {UserContext} from "../api/UserApiClient.ts";

interface ContextWrapper {
    exp: number;
    iat: number;
    sub: string;
    user: UserContext;
}

const useLoggedUser = () => {
    const accessToken = getAccessToken();

    if(!accessToken) {
        return null;
    }

    const token = jwtDecode<ContextWrapper>(accessToken);
    return token.user;
}

export default useLoggedUser;