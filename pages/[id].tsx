import FeedCard from '@/Components/FeedCard';
import TwitterLayout from '@/Components/FeedCard/Layout/TwitterLayout'
import { Tweet } from '@/gql/graphql';
import { useCurrentUser } from '@/hooks/user';
import type { NextPage } from 'next'
import Image from 'next/image';
import { BsArrowLeftShort } from 'react-icons/bs'


const UserProfilePage: NextPage = () =>{
    const {user} = useCurrentUser();
    return (
        <div>
            <TwitterLayout>
               <div>
                <nav className='flex items-center gap-3 py-3 px-3'>
                <BsArrowLeftShort className="text-4xl"/>
                <div>
                    <h1 className='text-xl font-semibold'>{user?.firstName} {user?.lastName}</h1>
                    <h1 className='text-sm font-bold text-gray-500'>1.8k tweets</h1>
                </div>
                </nav>
                <div className='p-4 border-b border-slate-800'>
                    {user?.profileImageURL &&  (
                    <Image 
                      src={user?.profileImageURL}
                      alt='profile-pic' 
                      height={100} 
                      width={100} 
                      className='rounded-full'/>
                      )}
                <h1 className='text-xl font-bold mt-2'>{user?.firstName} {user?.lastName}</h1>
                </div>
                <div>
                    {user?.tweets?.map((tweet) => (
                    <FeedCard data={tweet as Tweet} key={tweet?.id}/>
                    ))}
                </div>
               </div>
            </TwitterLayout>
        </div>
    )
}

export default UserProfilePage 