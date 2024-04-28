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
                id
                firstName
                lastName
                profileImageURL
            }
        }
    }
}
    `)

export const getUserByIdQuery = graphql(`#graphql
query GetUserById($id: ID!) {
  getUserById(id: $id) {
    email
    firstName
    lastName
    id
    profileImageURL
    tweets {
      content
      author {
        id
        firstName
        lastName
        profileImageURL
      }
      imageURL
    }
  }
}
`)