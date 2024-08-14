import React, { useState, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import HeaderIcon from "../HeaderIcon";
import { FaRegBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../../../content/Account/client";
import * as accountClient from "../../../content/Account/client";
import { setCurrentUser } from "../../../content/Account/reducer";
import { useNavigate } from "react-router";

export default function Header() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [postQuery, setPostQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (type: string, query: string) => {
    if (type === 'name') {
      navigate(`/search?name=${query}`);
    } else if (type === 'content') {
      navigate(`/search?content=${query}`);
    }
  };

  const signout = async () => {
    await accountClient.signout();
    dispatch(setCurrentUser(null));
    navigate("/login");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between p-2 lg:px-5 bg-white shadow-md">
      <div className="flex items-center">
        <img
          src="/Images/3665917.png"
          width={45}
          height={45}
          alt="Logo"
          className="mr-2"
        />
      </div>
      {/* User Search Bar */}
      <div className="flex ml-16 items-center rounded-full bg-gray-100 p-2 me-3 w-full max-w-lg">
        <BsSearch className="text-gray-600" />
        <input
          type="text"
          placeholder="Search users in BlueBook"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch('name', userQuery);
            }
          }}
          className="ml-2 bg-transparent outline-none placeholder-gray-500 flex-grow"
        />
      </div>

      <div className="flex flex-grow justify-center">
        {/* Center content goes here */}
        {/* Post Search Bar */}
        <div className="flex ml-16 items-center rounded-full bg-gray-100 p-2 me-3 w-full max-w-lg">
          <BsSearch className="text-gray-600" />
          <input
            type="text"
            placeholder="Search posts in BlueBook"
            value={postQuery}
            onChange={(e) => setPostQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch('content', postQuery);
              }
            }}
            className="ml-2 bg-transparent outline-none placeholder-gray-500 flex-grow"
          />
        </div>
      </div>

      <div className="flex items-center sm:space-x-2 justify-end relative" ref={dropdownRef}>
        {currentUser && (
          <div className="relative cursor-pointer flex items-center">
            <img
              className="rounded-full me-1"
              width={40}
              height={40}
              src={currentUser.profilePicture}
              alt="userImg"
              onClick={toggleDropdown} 
            />
            <p className="whitespace-nowrap font-semibold pr-3 ml-2" onClick={toggleDropdown}>
              {currentUser.username}
            </p>
            {showDropdown && (
              <div className="absolute right-14 mt-20 w-48 bg-white rounded-md shadow-lg z-10">
                <div
                  onClick={() => navigate("/profile")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </div>
                <div
                  onClick={() => navigate("/home")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Home
                </div>
                <div
                  onClick={signout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Sign Out
                </div>
              </div>
            )}
            <TiPlus className="icon" />
            <IoChatbubbleEllipsesOutline className="icon" />
            <FaRegBell className="icon" />
          </div>
        )}
        {!currentUser && (
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate("/login")}
              className="py-2 px-4 bg-blue-500 w-24 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
            <button 
              onClick={() => navigate("/signup")}
              className="py-2 px-4 bg-blue-500 w-24 text-white rounded-full hover:bg-blue-600 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}
