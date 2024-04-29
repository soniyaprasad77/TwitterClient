import FeedCard from '@/Components/FeedCard';
import TwitterLayout from '@/Components/FeedCard/Layout/TwitterLayout'
import { Tweet, User } from '@/gql/graphql';
import { useCurrentUser } from '@/hooks/user';
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image';
import { BsArrowLeftShort } from 'react-icons/bs'
import { useRouter } from 'next/router';
import { graphQlClient } from '@/clients/api';
import { getUserByIdQuery } from '@/graphql/queries/user';
import { use, useCallback, useMemo } from 'react';
import { followUserMutation, unfollowUserMutation } from '@/graphql/mutations/user';
import { useQueryClient } from '@tanstack/react-query';
interface ServerProps {
    userInfo?: User;
}
const UserProfilePage: NextPage<ServerProps> = (props) => {
    const router = useRouter();
    const { user: currentUser } = useCurrentUser();
    const queryClient = useQueryClient();

    const amIFollowing = useMemo(() => {
        if (!props.userInfo) return false;
        return (
            (currentUser?.following?.findIndex((el) => el?.id === props.userInfo?.id) ?? -1) >=0
        )
    }, [currentUser?.following, props.userInfo])

    const handleFollowUser = useCallback(async () => {
        if (!props.userInfo?.id) return ;
            await graphQlClient.request(followUserMutation, { to: props.userInfo?.id });
            await queryClient.invalidateQueries({queryKey:["current-user"]});
        
    }, [props.userInfo?.id, queryClient])
    const handleUnFollowUser = useCallback(async ()=>{
        if (!props.userInfo?.id) return ;
            await graphQlClient.request(unfollowUserMutation, { to: props.userInfo?.id });
            await queryClient.invalidateQueries({queryKey:["current-user"]});
    },[])

    // console.log(router.query);
    // console.log(props);
    return (

        <div>
            <TwitterLayout>
                <div>
                    <nav className='flex items-center gap-3 py-3 px-3  text-4xl'>
                        <BsArrowLeftShort />
                        <div>
                            <h1 className='text-xl font-semibold'>{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
                            <h1 className='text-sm font-bold text-gray-500'>{props.userInfo?.tweets?.length} tweets</h1>
                        </div>
                    </nav>
                    <div className='p-4 border-b border-slate-800'>
                        {props.userInfo?.profileImageURL && (
                            <Image
                                src={props.userInfo?.profileImageURL}
                                alt='profile-pic'
                                height={100}
                                width={100}
                                className='rounded-full' />
                        )}
                        <h1 className='text-xl font-bold mt-2'>{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-4 mt-2 text-sm text-gray-400'>
                                <span>{props.userInfo?.followers?.length} followers</span>
                                <span> {props.userInfo?.following?.length} following</span>
                            </div>

                            {currentUser?.id === props.userInfo?.id ? (
                                <button className='bg-white text-gray-800 px-3 py-1 rounded-full text-sm'>
                                    Edit Profile
                                </button>) : <>
                                {amIFollowing ? (
                                    <button 
                                    onClick={handleUnFollowUser}
                                    className='bg-white text-gray-800 px-3 py-1 rounded-full text-sm'>
                                    Unfollow
                                    </button>
                                ) : (
                                    <button 
                                    onClick={handleFollowUser}
                                    className='bg-white text-gray-800 px-3 py-1 rounded-full text-sm'>
                                    Follow
                                    </button>
                                )}
                            </>}

                        </div>
                    </div>
                    <div>
                        {props.userInfo?.tweets?.map((tweet) => (
                            <FeedCard data={tweet as Tweet} key={tweet?.id} />
                        ))}
                    </div>
                </div>
            </TwitterLayout>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id as string | undefined;
    //console.log(id);
    if (!id) return { notFound: true, props: { userInfo: undefined } }

    const userInfo = await graphQlClient.request(getUserByIdQuery, { id })
    if (!userInfo?.getUserById) return { notFound: true }
    return {
        props: {
            userInfo: userInfo.getUserById as User,
        }
    }
}
export default UserProfilePage 