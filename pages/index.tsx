import Image from "next/image";
import { Inter } from "next/font/google";
import { BsTwitterX } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FaUserAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";
import React, { use, useCallback, useState } from "react";
import FeedCard from "@/Components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphQlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import { useCurrentUser } from "@/hooks/user";
import { QueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";

const inter = Inter({ subsets: ["latin"] });

interface xSidebarButtons {
  title: string;
  icon: React.ReactNode;
}
const sideMenuItems: xSidebarButtons[] = [
  {
    title: "Home",
    icon: <IoHomeOutline />,
  },
  {
    title: "Explore",
    icon: <IoSearchOutline />,
  },
  {
    title: "Notifications",
    icon: <IoMdNotificationsOutline />,
  },
  {
    title: "Messages",
    icon: <MdEmail />,
  },
  {
    title: "Grok",
    icon: <LiaClipboardListSolid />,
  },

  {
    title: "Lists",
    icon: <LiaClipboardListSolid />,
  },
  {
    title: "Premium",
    icon: <BsTwitterX />,
  },
  {
    title: "Profile",
    icon: <FaUserAlt />,
  },
  {
    title: "More",
    icon: <CiCircleMore />,
  },
];

export default function Home() {
  const queryclient = new QueryClient();
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
  const handleGoogleLogin = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      console.log("google token " + googleToken);

      if (!googleToken)
        return toast.error("Google login failed: token not found");

      const { verifyGoogleToken } = await graphQlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      console.log("verifyGoogleToken" + verifyGoogleToken);
      toast.success("Google login successful: verified Successfully");
      if (verifyGoogleToken)
        window.localStorage.setItem("twiiter_token", verifyGoogleToken);
      await queryclient.invalidateQueries({ queryKey: ["current-user"] });
    },
    [queryclient]
  );
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen pl-40">
        <div className="col-span-2 pt-1 relative">
          <div className="text-3xl h-fit hover:bg-slate-800 rounded-full px-3 py-2  w-fit flex flex-wrap">
            <BsTwitterX />
          </div>
          <div className="mt-4 text-xl font-bold flex flex-wrap">
            <ul>
              {sideMenuItems.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-start items-center gap-5 hover:bg-slate-800 rounded-full w-fit px-2 py-3 cursor-pointer"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span className="hidden lg:inline md:hidden">
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
            <button 
            className="bg-[#1d9bf0] w-full p-3 rounded-full mx-[-10px] my-[20px] text-lg">
              Post
            </button>
          </div>
          {user && (
            <div className="absolute buttom-5 flex gap-2 items-center hover:bg-slate-800 rounded-full px-3 py-2">
              {user && user.profileImageURL && (
                <img
                  src={user.profileImageURL}
                  className="rounded-full"
                  alt="profile-pic"
                  height={50}
                  width={50}
                />
              )}
              <h3 className="text-xl">
                {user.firstName + " " + user.lastName}
              </h3>
            </div>
          )}
        </div>

        <div className="col-span-6  border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll hide-scrollbar cursor-pointer transition-all">
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
          </div>
          {tweets.map((tweet: Tweet)=> tweet ? <FeedCard key={tweet.id} data={tweet} /> : null)}
        </div>

        {!user && (
          <div className="col-span-3">
            <div className=" p-5 bg-slate-700 rounded-lg flex flex-wrap">
              <h2 className="text-2xl py-2">New to Twitter? </h2>
              <div className="">
                <GoogleLogin onSuccess={handleGoogleLogin} />
              </div>
            </div> 
          </div>
        )}
      </div>
    </div>
  );
}
