import React from "react";

// Components
import Sidebar from "./Sidebar";

export interface props {
  children?: React.ReactNode;
}

const Layout = ({ children }: props) => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex text-[#050505] font-['Figtree-Regular']">
      <Sidebar />
      <div className={"flex-1"}>{children}</div>
    </div>
  );
};

export default Layout;
