import {UserContext} from "../../../entity/UserContext.ts";
import {create} from "zustand";
import {getAccessToken} from "../../../utils/AuthUtils.ts";
import {jwtDecode} from "jwt-decode";

const parseContext = () => {
    const accessToken = getAccessToken();

    if(!accessToken) {
        return null;
    }

    const token = jwtDecode<ContextWrapper>(accessToken);
    return token.user;
}

interface ContextWrapper {
    exp: number;
    iat: number;
    sub: string;
    user: UserContext;
}

interface ContextStore {
    context: UserContext | null;
    reload: () => void;
}

export const useContextStore = create<ContextStore>((set) => ({
    context: parseContext(),
    reload: () => set(store => ({ ...store, context: parseContext() })),
}));

export const useCurrentUser = () => {
    return useContextStore(store => store.context);
}

export const useCurrentUserRequired = () => {
    return useContextStore(store => store.context!);
}

