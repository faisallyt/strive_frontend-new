import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/Context/AuthContext";
import { deleteUserSession, getUserSession } from "@/Auth/UserSession";
import Logo from "@/app/assets/logo/logostrive.png";
import { SiGamedeveloper } from "react-icons/si";
import Image from "next/image";
import Modal from "./Modal";
import Login from "../login";
import Register from "../register";

const NavBar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const { userData,refreshToken } = useAuth();

  const openLoginModal = () => {
    const modal = document.getElementById("login_modal") as HTMLDialogElement;
    modal?.showModal();
  }

  const openRegisterModal = () => {
    const modal = document.getElementById("register_modal") as HTMLDialogElement;
    modal?.showModal();
  }


  useEffect(() => {
    if (userData && refreshToken) {
      setIsAuthenticated(true);
    }
  }, [userData]);

  const handleLogout = () => {
    deleteUserSession();
    window.location.reload();
    setIsAuthenticated(false);
  };

  return (
    <nav className="relative p-2 w-full flex justify-between items-center h-[9%]">
      <div className="px-2 md:px-4 mx-auto w-full relative z-10 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex-shrink-0 items-center">
            <Link href="/">
              <Image src={Logo} alt="logo" className="w-24" />
              {/* <span className="text-white text-xl font-bold cursor-pointer">
                Strive
              </span> */}
            </Link>
          </div>
        </div>

        <div className="flex h-[2.5rem] pt-1 space-x-8 text-[0.9rem] font-medium">
          {isAuthenticated && userData ? ( //checking the authentication with the refresh token
            <>
              <button
                onClick={handleLogout}
                className=" text-[#FFFFFF] text-1 px-4 py-2 rounded-xl "
              >
                Logout
              </button>
              <button className="border border-[#FFFFFF] text-[#FFFFFF] text-1 px-4 py-2 rounded-xl mr-2">
                $1000.000
              </button>
              <button
                onClick={() => console.log("Navigate to wallet")}
                className="bg-blue-500 text-[#FFFFFF] text-1 px-4 py-2 rounded-xl"
              >
                Wallet
              </button>
            </>
          ) : (
            <>
              {/* <Link href="/login"> */}
                <button className=" text-[#FFFFFF] text-1 px-4 py-2 rounded-lg border border-[#353849]"
                  onClick={openLoginModal}
                >
                  Sign in
                </button>
              {/* </Link> */}
              {/* <Link href="/register"> */}
                <button className="bg-[#9562FF] hover:bg-[#ae60fc] text-[#FFFFFF] text-1 px-2 py-2 rounded-lg border border-[#a775ae]"
                  onClick={openRegisterModal}
                >

                  Register
                </button>
              {/* </Link> */}
            </>
          )}
        </div>
      </div>
      
    </nav>
  );
};

export default NavBar;
