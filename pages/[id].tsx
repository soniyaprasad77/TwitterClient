import TwitterLayout from '@/Components/FeedCard/Layout/TwitterLayout'
import type { NextPage } from 'next'


const UserProfilePage: NextPage = () =>{
    return (
        <div>
            <TwitterLayout>
                <h1>User Profile Page</h1>
            </TwitterLayout>
        </div>
    )
}

export default UserProfilePage 