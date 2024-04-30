import { graphQlClient } from "@/clients/api"
import { CreateTweetData } from "@/gql/graphql";
import { getAllTweetsQuery } from "@/graphql/queries/tweet"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTweetMutation } from "@/graphql/mutations/tweet";
import toast from "react-hot-toast";

export const useCreateTweet =  () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: CreateTweetData) => graphQlClient.request(createTweetMutation, { payload }),
        onMutate: (payload) => toast.loading("Creating Tweet...", {id:"1"}),
        onSuccess: async () =>{
            await queryClient.invalidateQueries({queryKey: ["all-tweets"]})
            toast.success("Tweet created successfully", {id:"1"})
        },
        onError: async () => toast.error("wait for 10 secs before creating another tweet", {id:"1"})
    });
    return mutation;
};

export const useGetAllTweets = () => {
    const query = useQuery(
        {
            queryKey: ["all-tweets"],
            queryFn: () => graphQlClient.request(getAllTweetsQuery) ,

        }
    )
    console.log(query.data)
    return { ...query, tweets: query.data?.getAllTweets}
}
// Path: TwitterClient/hooks/tweet.ts