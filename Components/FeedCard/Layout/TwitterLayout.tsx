import { graphQlClient } from "@/clients/api";
import { useRouter } from "next/router";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { BsTwitterX } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import { FaImage, FaUserAlt } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";
import { MdEmail } from "react-icons/md";

interface xSidebarButtons {
  title: string;
  icon: React.ReactNode;
  link:string;
}
 
interface TwitterLayoutProps {
  children: React.ReactNode;
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const queryclient = new QueryClient();
  const { user } = useCurrentUser();
  const router = useRouter();
  console.log(router.query)
  const sideMenuItems: xSidebarButtons[] = useMemo(()=>
    [
        {
          title: "Home",
          icon: <IoHomeOutline />,
          link:'/'
        },
        {
          title: "Explore",
          icon: <IoSearchOutline />,
          link:'/'
        },
        {
          title: "Notifications",
          icon: <IoMdNotificationsOutline />,
          link:"/"
        },
        {
          title: "Messages",
          icon: <MdEmail />,
          link:"/"
        },
        {
          title: "Grok",
          icon: <LiaClipboardListSolid />,
          link:"/"
        },
      
        {
          title: "Lists", 
          icon: <LiaClipboardListSolid />,
          link:"/"
        },
        {
          title: "Premium",
          icon: <BsTwitterX />,
          link:"/"
        },
        {
          title: "Profile",
          icon: <FaUserAlt />,
          link:`/${user?.id}`
        },
        {
          title: "More",
          icon: <CiCircleMore />,
          link:"/"
        },
      ],
      [user?.id]
  )
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

    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-40">
        <div className="col-span-3 pt-1 flex justify-end pr-4 relative">
          <div className="absolute gap-2">
            <div className="text-3xl h-fit hover:bg-slate-800 rounded-full px-3 py-2  w-fit flex flex-wrap">
              <BsTwitterX />
            </div>
            <div className="mt-1 text-xl pr-4 overflow-y-auto">
              <ul>
                {sideMenuItems.map((item) => (
                  <li
                    key={item.title}
                   
                  >
                    <Link 
                     className="flex justify-start items-center gap-5 hover:bg-slate-800 rounded-full w-fit px-2 py-3 cursor-pointer"
                    href={item.link}>
                    <span className="text-3xl">{item.icon}</span>
                    <span className="hidden sm:inline">{item.title}</span>
                    </Link>    
                  </li>
                ))}
              </ul>
              <div className="mt-5 px-3">
                <button className="hidden sm:block bg-[#1d9bf0] w-full font-semibold text-lg py-2 px-6 m-0 rounded-full">
                  Post
                </button>
                <button className=" block sm:hidden bg-[#1d9bf0] w-full font-semibold text-lg py-2 px-3  rounded-full">
                  <BsTwitterX />
                </button>
              </div>
            </div>
            {user && (
              <div className="absolute buttom-5 gap-2 items-center hover:bg-slate-800 rounded-full px-3 py-2">
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
        </div>

        <div className="col-span-11 pl-14 sm:pl-0  sm:col-span-7 md:col-span-5 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll hide-scrollbar cursor-pointer transition-all">
          {props.children}
        </div>
        <div className="col-span-0 sm:col-span-3 p-5">
          {!user && (
            <div className=" p-5 bg-slate-700 rounded-lg ">
              <h2 className="text-2xl py-2">New to Twitter? </h2>
              <GoogleLogin onSuccess={handleGoogleLogin} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TwitterLayout;
