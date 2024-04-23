import Image from "next/image";
import { Inter } from "next/font/google";
import { BsTwitterX } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FaUserAlt } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import React, { useCallback } from "react";
import FeedCard from "@/Components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

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
  const handleGoogleLogin = useCallback((cred: CredentialResponse)=>{
    
  }, [])
  return (
    <div className={inter.className}>
      <div className="grid grid-cols-12 h-screen w-screen pl-40">
        <div className="col-span-2 pt-1">
          <div className="text-3xl h-fit hover:bg-slate-800 rounded-full px-3 py-2  w-fit">
            <BsTwitterX />
          </div>
          <div className="mt-4 text-xl font-bold">
            <ul>
              {sideMenuItems.map((item) => (
                <li
                  key={item.title}
                  className="flex flex-start items-center gap-5 hover:bg-slate-800 rounded-full w-fit px-2 py-3 cursor-pointer"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <button className="bg-[#1d9bf0] w-full p-3 rounded-full mx-[-10px] my-[20px] text-lg">
              Post
            </button>
          </div>
        </div>
        <div className="col-span-6  border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll hide-scrollbar cursor-pointer transition-all">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>

        <div className="col-span-3">
          <div className=" p-5 bg-slate-700 rounded-lg">
            <h2 className="text-2xl py-2">New to Twitter? </h2>
          <GoogleLogin onSuccess={(cred)=> console.log(cred)} />
          </div>
        </div>
      </div>
    </div>
  );
}
