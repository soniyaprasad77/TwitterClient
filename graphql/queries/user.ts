import { graphql } from "../../gql"

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
        recommendedUsers{
               id
               firstName
               lastName
              profileImageURL
    }
        followers{
          id
          firstName
          lastName
          profileImageURL
        }
        following {
          id
           firstName
           lastName
           profileImageURL
       }
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
    
    followers{
          id
          firstName
          lastName
          profileImageURL
        }
        following {
           id
           firstName
           lastName
           profileImageURL
       }
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