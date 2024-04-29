
import { Inter } from "next/font/google";
import { FaImage } from "react-icons/fa6";
import React, { use, useCallback, useEffect, useState } from "react";
import FeedCard from "@/Components/FeedCard";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet, User } from "@/gql/graphql";
import TwitterLayout from "@/Components/FeedCard/Layout/TwitterLayout";
import { GetServerSideProps } from "next";
import { graphQlClient } from "@/clients/api";
import { getAllTweetsQuery, getSignedURLForTweetQuery } from "@/graphql/queries/tweet";
import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });
interface homeProps{
  tweets: Tweet[];
}

export default function Home(props: homeProps) {
 
  const { user } = useCurrentUser();
  const {mutate} = useCreateTweet();  
  const {tweets = props.tweets as Tweet[]} = useGetAllTweets();
  const [content, setContent] =useState("");
  const [imageURL, setImageURL] = useState("");
 

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event)=>{
      event.preventDefault();
        console.log(input.files);
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;
      const { getSignedURLForTweet } = await graphQlClient.request(getSignedURLForTweetQuery, {
        imageName: file.name,
        imageType: file.type,
      });
      if (getSignedURLForTweet) {
        toast.loading("Uploading Image....", {id:"2"})
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },   
        });
        toast.success("Image Uploaded Successfully", {id:"2"});
        const url = new URL(getSignedURLForTweet);
        const myFilePath = `${url.origin}${url.pathname}`;
        setImageURL(myFilePath);  
      }
    }
    }, []) 
  const handleSelectImage =useCallback( () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    const handleFn = handleInputChangeFile(input);
    input.addEventListener("change", handleFn)
    input.click();
    
  }, [handleInputChangeFile]);



  console.log(user);
  const handleCreateTweet = useCallback(() =>{
          mutate({
             content,
             imageURL
          })
          setContent("");
          setImageURL("");
  },[content, mutate, imageURL])

  return (
    <div className={inter.className}>
       <TwitterLayout>
       <div>
            <div className="border border-gray-600 border-left-0 border-right-0 border-bottom-0 p-4 hover:transition-all cursor-pointer">
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1">
                  {user?.profileImageURL && (
                    <img
                      src={user?.profileImageURL}
                      alt="profile-pic"
                      height={50}
                      width={50}
                      className="rounded-full"
                    />
                  )}
                </div>
                <div className="col-span-11">
                  <textarea
                    value={content}
                     onChange={(e)=>setContent(e.target.value)}
                    className="w-full bg-transparent px-3 text-xl border-b border-slate-700"
                    rows={3}
                    placeholder="What's happening?"
                  ></textarea>
                   {imageURL && (
                    <Image
                      src={imageURL}
                      alt="tweet-pic"
                      className="w-full h-96 object-cover rounded-lg"
                      width={300}
                      height={300}
                    />         
                  )}
                  <div className="mt-2 text-xl flex justify-between items-center">
                    <div onClick={handleSelectImage} >
                    <FaImage />
                    </div>

                    <button 
                    onClick={handleCreateTweet}
                    className="bg-[#1d9bf0] px-4 py-2 rounded-full text-sm">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {tweets.map((tweet: Tweet)=> tweet ? <FeedCard key={tweet.id} data={tweet} /> : null)}
          </div>
       </TwitterLayout>
    </div>
  );
}

export const getServerSideProps :GetServerSideProps<homeProps> = async (context)=>{
 const allTweets = await graphQlClient.request(getAllTweetsQuery);
  return {
    props:{
      tweets: allTweets.getAllTweets as Tweet[]

    }
  }
}