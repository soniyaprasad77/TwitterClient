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
interface ServerProps{
    userInfo?: User;
}
const UserProfilePage: NextPage<ServerProps>= (props) =>{
    const router = useRouter();
    console.log(router.query);
    console.log(props);
    return (

        <div>
            <TwitterLayout>
               <div>
                <nav className='flex items-center gap-3 py-3 px-3  text-4xl'>
                <BsArrowLeftShort/>
                <div>
                    <h1 className='text-xl font-semibold'>{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
                    <h1 className='text-sm font-bold text-gray-500'>{props.userInfo?.tweets?.length} tweets</h1>
                </div>
                </nav>
                <div className='p-4 border-b border-slate-800'>
                    {props.userInfo?.profileImageURL &&  (
                    <Image 
                      src={props.userInfo?.profileImageURL}
                      alt='profile-pic' 
                      height={100} 
                      width={100} 
                      className='rounded-full'/>
                      )}
                <h1 className='text-xl font-bold mt-2'>{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
                </div>
                <div>
                    {props.userInfo?.tweets?.map((tweet) => (
                    <FeedCard data={tweet as Tweet} key={tweet?.id}/>
                    ))}
                </div>
               </div>
            </TwitterLayout>
        </div>
    )
}
export const getServerSideProps : GetServerSideProps = async(context)=>{
    const id = context.query.id as string | undefined;
    //console.log(id);
    if(!id) return {notFound:true, props:{userInfo:undefined}}
   
    const userInfo = await graphQlClient.request(getUserByIdQuery, {id} )
    if(!userInfo?.getUserById) return {notFound:true}
    return {
        props:{
            userInfo: userInfo.getUserById as User,
        }
    }
}
export default UserProfilePage 