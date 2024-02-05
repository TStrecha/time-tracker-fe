import {useQuery} from "@tanstack/react-query";
import { userApiClient } from "../api/UserApiClient";
import useAuthStore from "../components/auth/store.ts";

const useLoggedUser = () => {
    const accessToken = useAuthStore(store => store.accessToken);

    return useQuery({
        queryKey: ['loggedUser', accessToken],
        queryFn: () => userApiClient.getLoggedUser(),
        retry: false,
    })
}

export default useLoggedUser;