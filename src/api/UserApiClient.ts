import BaseApiClient from "./ApiClient";

export type AccountTypes = "PERSON" | "COMPANY";

export interface ContextUserDTO {
    id: number;
    email: string;
    fullName: string;
    accountType: AccountTypes;
    activeFrom: number;
    activeTo: number;
    secureValues: boolean;
}

export interface UserContext {
    id: number;
    email: string;
    fullName: string;
    role: 'USER' | 'ADMIN';
    loggedAs: ContextUserDTO;

    relationshipsReceiving: ContextUserDTO[];

    activePermissions: string[];
}

class UserApiClient extends BaseApiClient<UserContext> {

    constructor() {
        super('/user');
    }

    getLoggedUser = () => this.get();
}

export const userApiClient = new UserApiClient();