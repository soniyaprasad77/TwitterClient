import {graphql} from "../../gql"

export const verifyUserGoogleTokenQuery = graphql(`#graphql

query verifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
}
    `)

export const getCurrentUserQuery = graphql(`#graphql    
query GetCurrentUser {
    getCurrentUser {
        id
        firstName
        email
        lastName
        profileImageURL
        tweets{
            id
            content
            author{
                firstName
                lastName
                profileImageURL
            }
        }
    }
}
    `)