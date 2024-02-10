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

    activePermissions: string[];
}