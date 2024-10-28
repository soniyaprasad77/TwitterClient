import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";
const graphQlClient = new GraphQLClient("http://localhost:8000/graphql");

console.log(isClient)
// Function to set Authorization header
const setAuthorizationHeader = () => {
    if (isClient) {
        const token = window.localStorage.getItem("twiiter_token");
        if (token) {
            graphQlClient.setHeader("Authorization", `Bearer ${token}`);
        }
    }
};

// Call the function to set Authorization header
setAuthorizationHeader();

export { graphQlClient };
