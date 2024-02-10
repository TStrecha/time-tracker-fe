import {useQuery} from "@tanstack/react-query";
import {contextApiClient} from "../api/UserApiClient.ts";
import {useCurrentUserRequired} from "../components/auth/context/store.ts";

const useAvailableContexts = () => {
    const currentUser = useCurrentUserRequired();

    return useQuery({
        queryKey: ["contexts", currentUser.id],
        queryFn: () => contextApiClient.getAvailableContexts(),
    });
}

export default useAvailableContexts;