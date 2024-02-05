import BaseApiClient from "./ApiClient";

export interface LoginResponseDTO {
    success: boolean;
    authToken: string;
    refreshToken: string;
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}

export interface UserRegistrationRequestDTO {
    email: string;

    firstName?: string;
    lastName?: string;
    companyName?: string;

    password: string;

    accountType: 'PERSON' | 'COMPANY';
}

class LoginApiClient extends BaseApiClient<LoginResponseDTO> {

    constructor() {
        super('/auth/login');
    }

    login = (loginRequest: LoginRequestDTO) => this.post(loginRequest);
}

class RegisterApiClient extends BaseApiClient<number> {

    constructor() {
        super('/auth/register');
    }

    register = (registerRequest: UserRegistrationRequestDTO) => this.post(registerRequest);
}

export const loginApiClient = new LoginApiClient();
export const registerApiClient = new RegisterApiClient();
