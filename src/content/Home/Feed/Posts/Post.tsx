import { FaRegThumbsUp } from "react-icons/fa6";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaRegShareSquare } from "react-icons/fa";

export default function Post({name, message, email, timestamp, image, postImage} : any) {

  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <img 
          className="rounded-full"
          src={image} 
          width={40}
          height={40}
          alt="" />

          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-400">{timestamp}</p>
          </div>
        </div>
        <p className="pt-4">{message}</p>
      </div>
      {postImage && (
        <div className="relative h-56 md:h-86 bg-white">
          <img src={postImage}/>
        </div>)  
      }

      {/* footer */}
      <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
        <div className="inputIcon rounded-none rounded-bl-2xl">
          <FaRegThumbsUp className="h-4"/>
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div className="inputIcon rounded-none">
          <IoChatboxEllipsesOutline className="h-4"/>
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div className="inputIcon rounded-none rounded-br-2xl">
          <FaRegShareSquare className="h-4"/>
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
    </div>
  )
}