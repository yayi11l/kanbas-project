import React from 'react'
import SidebarRow from '../SidebarRow';
import { HiUsers, HiUserGroup } from "react-icons/hi2";
import { FaCaretDown } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className='p-2 mt-5 max-w-[200px] xl:min-w-[100px]'>
      <SidebarRow Icon={HiUsers} title="Friends"/>
      <SidebarRow Icon={HiUserGroup} title="Groups"/>
      <SidebarRow Icon={FaCaretDown} title="See more"/>

    </div>
  )
}
