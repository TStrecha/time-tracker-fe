import BaseApiClient from "./ApiClient.ts";
import {ContextUserDTO} from "../entity/UserContext.ts";

class ContextApiClient extends BaseApiClient<ContextUserDTO> {

    constructor() {
        super('/user/context');
    }

    getAvailableContexts = () => this.getAll();
}

export const contextApiClient = new ContextApiClient();