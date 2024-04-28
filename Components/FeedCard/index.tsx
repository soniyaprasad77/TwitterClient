import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { CiBookmark } from "react-icons/ci";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
  data:Tweet
}
const FeedCard: React.FC<FeedCardProps> = (props) => {
  const {data} = props;
  return (
    <div className="border border-gray-600 border-left-0 border-right-0 border-bottom-0 p-4 hover:bg-slate-600 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {data.author?.profileImageURL && <img
            src={data.author?.profileImageURL}
            alt="profile"
            height={50}
            width={50}
            className="rounded-full"
          /> }       
        </div>
        <div className="col-span-11">
        <h5>
          <Link href={`/${data.author?.id}`}>
        {data.author?.firstName} { data.author?.lastName}
          </Link>
        </h5>
          <p className="pb-4 pt-0">
            {data.content}
          </p>
          <div className="flex justify-between text-xl pr-6 ">
            <div>
              <FiMessageCircle />
            </div>
            <div>
              <AiOutlineRetweet />
            </div>
            <div>
              <FaRegHeart />
            </div>
            <div>
              <RxActivityLog />
            </div>
            <div>
              <CiBookmark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
