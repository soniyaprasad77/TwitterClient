import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { CiBookmark } from "react-icons/ci";

const FeedCard: React.FC = () => {
  return (
    <div className="border border-gray-600 border-left-0 border-right-0 border-bottom-0 p-4 hover:bg-slate-600 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          <img
            src="https://avatars.githubusercontent.com/u/63783532?v=4"
            alt="profile"
            height={50}
            width={50}
            className="rounded-full"
          />
        </div>
        <div className="col-span-11">
          <h5>Soniya Prasad</h5>
          <p>
            Hi everyone, I am Soniya Prasad. I just Joined X. Can you guys share
            your experience with me? I am excited to be a part of this
            community. Looking forward to learning and growing with you all.
            Hopefully you all will help me in my journey.
          </p>
          <div className="flex justify-between text-xl pr-6">
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
