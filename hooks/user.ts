import { graphQlClient } from "@/clients/api"
import { getCurrentUserQuery } from "@/graphql/queries/user"
import {useQuery} from "@tanstack/react-query"

export const useCurrentUser = () => {
    const query = useQuery(
        {
            queryKey: ["current-user"],
            queryFn: ()=> graphQlClient.request(getCurrentUserQuery),
        }
    )
    return {...query, user: query.data?.getCurrentUser} 
}

// Path: hooks/useCurrentUser.ts