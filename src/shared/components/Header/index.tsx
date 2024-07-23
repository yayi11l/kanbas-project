import { BsSearch, BsShop } from "react-icons/bs";
import { FaHouse } from "react-icons/fa6";
import { TiGroup, TiPlus } from "react-icons/ti";
import { LuMonitorPlay } from "react-icons/lu";
import { FaRegBell, FaCaretDown } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import HeaderIcon from "../HeaderIcon";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between p-2 lg:px-5 bg-white shadow-md">
      <div className="flex items-center">
        <img
          src="/Images/3665917.png"
          width={45}
          height={45}
          alt="Logo"
          className="mr-2 fixed"
        />
      </div>
      <div className="flex ml-16 items-center rounded-full bg-gray-100 p-2 me-3">
        <BsSearch className="h6 text-gray-600"/>
        <input type="text" 
               placeholder="Search BlueBook"
               className="hidden md:inline-flex ml-2 items-center bg-transparent 
               outline-none placeholder-gray-500 flex-shrink"/>     
      </div>

      <div className="flex flex-grow justify-center">
        {/* Center content goes here */}
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={FaHouse} />
          <HeaderIcon Icon={LuMonitorPlay} />
          <HeaderIcon Icon={BsShop} />
          <HeaderIcon Icon={TiGroup} />
        </div>
      </div>

      <div className="flex items-center sm:space-x-2 justify-end">
        {/* profile image after login */}
        {/* <img 
          onClick={signOut}
          className="rounded-full cursor-pointer"
          width={40}
          height={40}
          src={user.image} 
          alt="userImg" 
        /> */}

        {/* Right content goes here */}
        <p className="whitespace-nowrap font-semibold pr-3">Your Name</p>
        <TiPlus className="icon"/>
        <IoChatbubbleEllipsesOutline className="icon"/>
        <FaRegBell className="icon"/>
        <FaCaretDown className="icon"/>
      </div>
    </div>
  )
}