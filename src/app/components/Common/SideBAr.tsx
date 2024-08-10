import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { getUserSession } from "@/Auth/UserSession";
import { TbAffiliateFilled } from "react-icons/tb";
import { FaBloggerB } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { HiCubeTransparent } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiSupport } from "react-icons/bi";
import { useAuth } from "@/app/Context/AuthContext";

const Sidebar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const { userData } = useAuth();

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
    }
  }, [userData]);
  


  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const { userData } = getUserSession();
  //     if (userData && userData.username) {
  //       setUsername(userData.username);
  //     }
  //   }
  // }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className="relative bg-[#12141C] text-[#6F79A1] text-[0.87rem] font-medium w-full rounded-xl md:w-[19%] flex flex-col p-4"
      style={{ height: "calc(100vh - 4.5rem)" }}
    >
      {/* Profile section */}
      <div
        className="p-1 flex items-center justify-between cursor-pointer rounded-md mt-3 bg-[#1F2230]"
        onClick={toggleDropdown}
      >
        {/* Profile Photo */}
        <div className="h-10 rounded-lg w-10 bg-gray-300 mr-2"></div>
        {/* Hello message */}
        <div className="flex flex-col">
          <h2 className="text-[0.9rem] font-medium text-[#F5F0FF]">
            {username || "New User"}
          </h2>
        </div>
        {/* Arrow Icon */}
        <div className="ml-auto font-bold text-2xl">
          {isDropdownOpen ? <RiArrowLeftSLine /> : <RiArrowRightSLine />}
        </div>
      </div>

      {/* Dropdown content */}
      {isDropdownOpen && (
        <div className="absolute left-full top-1 bg-[#12141C] m-2 text-[0.87rem] font-medium rounded-md w-40 z-30">
          <ul className="p-1">
            <li className="flex items-center px-2 py-2 cursor-pointer text-[#FFFFFF] text-1 hover:bg-[#1F1943] hover:text-[#FFFFFF] rounded-[4px]">
              <Link href="/profile" className="flex items-center">
                <span className="mr-2">
                  <CgProfile />
                </span>
                <span>Profile</span>
              </Link>
            </li>
            <li className="flex items-center px-2 py-2 cursor-pointer text-[#FFFFFF] text-1 hover:bg-[#1F1943] hover:text-[#FFFFFF] rounded-[4px]">
              <Link href="/profile" className="flex items-center">
                <MdAccountBalanceWallet className="mr-2" />
                <span>Wallet</span>
              </Link>
            </li>

            <li className="flex items-center px-2 py-2 cursor-pointer text-[#FFFFFF]  hover:bg-[#1F1943] hover:text-[#FFFFFF] rounded-[4px]">
              <Link href="/profile" className="flex items-center">
                <IoStatsChart className="mr-2" />
                <span>Statistics</span>
              </Link>
            </li>
            <li className="flex items-center px-2 py-2 cursor-pointer text-[#FFFFFF] hover:bg-[#1F1943] hover:text-[#FFFFFF] rounded-[4px]">
              <Link href="/settings" className="flex items-center">
                <GrTransaction className="mr-2" />
                <span>Transactions</span>
              </Link>
            </li>
            <li className="flex items-center px-2 py-2 cursor-pointer text-[#FFFFFF]  hover:bg-[#1F1943] hover:text-[#FFFFFF] rounded-[4px]">
              <Link href="/logout" className="flex items-center">
                <HiCubeTransparent className="mr-2" />
                <span>My Bets</span>
              </Link>
            </li>
            <li className="flex items-center px-2 py-2 cursor-pointer text-[#FFFFFF]  hover:bg-[#1F1943] hover:text-[#FFFFFF] rounded-[4px]">
              <Link href="/logout" className="flex items-center">
                <IoMdSettings className="mr-2" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
      {/* Menu Options */}
      <ul className="py-2 text-[0.88rem]">
        <li className=" flex items-center px-2 py-2  flex-row cursor-pointer group text-[#8E84A3]  hover:bg-[#1F1943] hover:text-[#FFFFFF] rounded-md">
          <Link href="/" className="flex items-center">
            <TbAffiliateFilled className="mr-2" />
            <span>Affiliate</span>
          </Link>
        </li>
        <li className=" flex items-center px-2 py-2  flex-row cursor-pointer group text-[#8E84A3]  hover:bg-[#1F1943] hover:text-[#FFFFFF] rounded-md">
          <Link href="/" className="flex items-center">
            <FaBloggerB className="mr-2" />
            <span>Blog</span>
          </Link>
        </li>
        <li className="flex items-center px-2 py-2  flex-row cursor-pointer group text-[#8E84A3]  hover:bg-[#1F1943] hover:text-[#FFFFFF] rounded-md">
          <Link href="/" className="flex items-center">
            <FaBloggerB className="mr-2" />
            <span>Responsible Gambling</span>
          </Link>
        </li>
        <li className="px-2 py-2 flex items-center flex-row cursor-pointer group text-[#8E84A3] hover:bg-[#1F1943] hover:text-[#FFFFFF] rounded-md">
          <Link href="/" className="flex items-center">
            <BiSupport className="mr-2" />
            <span>Help & Support</span>
          </Link>
        </li>
        <li className="px-2 py-2 flex items-center flex-row cursor-pointer group text-[#8E84A3] hover:bg-[#1F1943] hover:text-[#FFFFFF] rounded-md">
          <Link href="/changepassword" className="flex items-center">
            <RiLockPasswordFill className="mr-2" />
            <span>Change Password</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
