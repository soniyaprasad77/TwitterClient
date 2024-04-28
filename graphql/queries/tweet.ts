import { graphql } from "../../gql"

export const getAllTweetsQuery = graphql(`#graphql
  query GetAllTweets {
    getAllTweets{
        id
        imageURL
        content
        author {
         id
         firstName
         lastName
         profileImageURL
        }

    }
   }
`)

export const getSignedURLForTweetQuery = graphql(`#graphql
  query GetSignedURLForTweet($imageName: String!, $imageType: String!) {
  getSignedURLForTweet(imageName: $imageName, imageType: $imageType)
}
`)