import { graphQlClient } from "@/clients/api";
import { useRouter } from "next/router";
import { verifyUserGoogleTokenQuery } from "@/graphql/queries/user";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import {  BsTwitterX } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { LiaClipboardListSolid } from "react-icons/lia";
import { MdEmail } from "react-icons/md";
import Image from 'next/image'

interface xSidebarButtons {
  title: string;
  icon: React.ReactNode;
  link: string;
}

interface TwitterLayoutProps {
  children: React.ReactNode;
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const queryclient = new QueryClient();
  const { user } = useCurrentUser();
  const router = useRouter();
  console.log(router.query)
  const sideMenuItems: xSidebarButtons[] = useMemo(() =>
    [
      {
        title: "Home",
        icon: <IoHomeOutline />,
        link: '/'
      },
      {
        title: "Explore",
        icon: <IoSearchOutline />,
        link: '/'
      },
      {
        title: "Notifications",
        icon: <IoMdNotificationsOutline />,
        link: "/"
      },
      {
        title: "Messages",
        icon: <MdEmail />,
        link: "/"
      },
      {
        title: "Grok",
        icon: <LiaClipboardListSolid />,
        link: "/"
      },

      {
        title: "Lists",
        icon: <LiaClipboardListSolid />,
        link: "/"
      },
      {
        title: "Profile",
        icon: <FaUserAlt />,
        link: `/${user?.id}`
      },
      {
        title: "More",
        icon: <CiCircleMore />,
        link: "/"
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
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
          <div>
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all">
              <BsTwitterX />
            </div>
            <div className="mt-1 text-xl pr-4">
              <ul>
                {sideMenuItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                      href={item.link}
                    >
                      <span className=" text-3xl">{item.icon}</span>
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 px-3">
                <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  Tweet
                </button>
                <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  <BsTwitterX />
                </button>
              </div>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-2 rounded-full">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                />
              )}
              <div className="hidden sm:block">
                <h3 className="text-xl">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-11 pl-8  sm:pl-0  sm:col-span-7 md:col-span-5 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll hide-scrollbar cursor-pointer transition-all">
          {props.children}
        </div>
        <div className="col-span-0 sm:col-span-3 p-5">
          {!user ? (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleGoogleLogin} />
            </div>
          ) : (
            <div className="px-4 py-3 bg-slate-800 rounded-lg">
              <h1 className="my-2 text-2xl mb-5">Users you may know</h1>
              {user?.recommendedUsers?.map((el) => (
                <div className="flex items-center gap-3 mt-2" key={el?.id}>
                  {el?.profileImageURL && (
                    <Image
                      src={el?.profileImageURL}
                      alt="user-image"
                      className="rounded-full"
                      width={60}
                      height={60}
                    />
                  )}
                  <div>
                    <div className="text-lg">
                      {el?.firstName} {el?.lastName}
                    </div>
                    <Link
                      href={`/${el?.id}`}
                      className="bg-white text-black text-sm px-5 py-1 w-full rounded-lg"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
export default TwitterLayout;
