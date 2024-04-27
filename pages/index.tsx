
import { Inter } from "next/font/google";
import { FaImage } from "react-icons/fa6";
import React, { use, useCallback, useState } from "react";
import FeedCard from "@/Components/FeedCard";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/Components/FeedCard/Layout/TwitterLayout";

const inter = Inter({ subsets: ["latin"] });



export default function Home() {
 
  const { user } = useCurrentUser();
  const {tweets=[]} = useGetAllTweets(); 
  const {mutate} = useCreateTweet();
  const [content, setContent] =useState("");
  console.log(tweets);
  const handleSelectImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  };
  console.log(user);
  const handleCreateTweet = useCallback(() =>{
          mutate({
             content
          })
          setContent("");
  },[content, mutate])

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
