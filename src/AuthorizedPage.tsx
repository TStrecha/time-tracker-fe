import {Navigate} from "react-router-dom";
import {ReactNode} from "react";
import {isAuthorized, logout} from "./utils/AuthUtils.ts";

export const AuthorizedPage = ({ children }: { children: ReactNode }) => {
    if (!isAuthorized()) {
        logout();
        return <Navigate to={"/auth/login"} />;
    }

    return <>{children}</>;
};