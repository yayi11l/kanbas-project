import { BsSearch, BsShop } from "react-icons/bs";
import { FaHouse } from "react-icons/fa6";
import { TiGroup } from "react-icons/ti";
import { LuMonitorPlay } from "react-icons/lu";
import HeaderIcon from "../HeaderIcon";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between p-2 lg:px-5 bg-white shadow-md">
      <div className="flex items-center">
        <img
          src="/Images/3665917.png"
          width={50}
          height={50}
          alt="Logo"
          className="mr-2 fixed"
        />
      </div>
      <div className="flex ml-16 items-center rounded-full bg-gray-100 p-2 me-3">
        <BsSearch className="h6 text-gray-600"/>
        <input type="text" 
               placeholder="Search BlueBook"
               className="flex ml-2 items-center bg-transparent 
               outline-none placeholder-gray-500 flex-shrink"/>     
      </div>

      <div className="flex-grow justify-center">
        {/* Center content goes here */}
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={FaHouse} />
          <HeaderIcon Icon={LuMonitorPlay} />
          <HeaderIcon Icon={BsShop} />
          <HeaderIcon Icon={TiGroup} />
        </div>
      </div>

      <div className="flex items-center">
        {/* Right content goes here */}
      </div>
    </div>
  )
}