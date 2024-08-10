import React from "react";
import NavBar from "../Common/NavBar";
import SideBar from "../Common/SideBAr";
import Login from "../login";
import Register from "../register";

interface LayoutProps {
  children: React.ReactNode;
  setLoader: (t:boolean)=>void;
}

const Layout: React.FC<LayoutProps> = ({ children, setLoader }) => {
  return (
    <div className="bg-[#0E1016] flex flex-col">
      <Login setLoader={setLoader} />
      <Register setLoader={setLoader}/>
      <div className="flex-none">
        <NavBar />
      </div>

      <div className="flex gap-2 p-2 flex-1">
        <SideBar />

        <div
          className="flex flex-col flex-1 gap-2 overflow-y-auto  p-2 rounded-xl"
          style={{ height: "calc(100vh - 4.5rem)" }}
        >
          {children}
        </div>
      </div> 
      
    </div>
  );
};

export default Layout;
