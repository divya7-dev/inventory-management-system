"use client";

import React from "react";
import { useState } from "react";
import arrow from "../../../public/images/down_arrow.png";
import loginBg from "../../../public/images/login_bg_removebg.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  const [isSalesClicked, setSalesClick] = useState<boolean>(
    pathname.includes("sales"),
  );
  const [isPurchaseClicked, setPurchaseClick] = useState<boolean>(
    pathname.includes("purchases"),
  );

  return (
    <div className="flex-row rounded-lg h-screen bg-[#F3F8ED] w-52">
      <div className="text-[14px] gap-x-1.5 items-center text-[#050505] rounded-lg font-['Figtree-Regular'] ml-5">
        <div className="flex justify-start items-center gap-1 text-[20px] font-['Figtree-Bold'] pl-1 py-6">
          <div>
            <Image
              width={60}
              height={60}
              src={loginBg}
              alt="login background"
              className="object-center"
            />
          </div >
        </div>
        <a
          href="/stocks"
          className={`${pathname === "/stocks" && "font-['Figtree-Bold']"} border-b p-1 border-[#F0F0EF] block hover:bg-[#80B537]`}
        >
          Stock
        </a>

        <div
          className={`flex border-b p-1 border-[#F0F0EF] hover:bg-[#80B537] cursor-pointer `}
          onClick={() => {
            setSalesClick(!isSalesClicked);
          }}
        >
          <p className="flex-1">Sales</p>
          <Image
            width={20}
            style={{ transform: isSalesClicked ? "rotate(180deg)" : "none" }}
            src={arrow}
            alt="drop-down-icon"
          />
        </div>
        {isSalesClicked && (
          <div className="ml-10 mr-5 rounded-lg text-[14px]">
            <a
              href="/sales/customers"
              className={`border-b p-1 border-[#F0F0EF] block hover:bg-[#80B537] ${pathname == "/sales/customers" && "font-['Figtree-Bold']"}`}
            >
              Customer
            </a>
            <a
              href="/sales/invoices"
              className={`border-b p-1 border-[#F0F0EF] block hover:bg-[#80B537] ${pathname == "/sales/invoices" && "font-['Figtree-Bold']"}`}
            >
              Invoices
            </a>
          </div>
        )}

        <div
          className={`flex border-b p-1 border-[#F0F0EF] hover:bg-[#80B537] cursor-pointer `}
          onClick={() => {
            setPurchaseClick(!isPurchaseClicked);
          }}
        >
          <p className="flex-1">Purchases</p>
          <Image
            width={20}
            style={{ transform: isPurchaseClicked ? "rotate(180deg)" : "none" }}
            src={arrow}
            alt="drop-down-icon"
          />
        </div>
        {isPurchaseClicked && (
          <div className="ml-10 mr-5 rounded-lg text-[14px]">
            <a
              href="/purchases/vendors"
              className={`border-b p-1 border-[#F0F0EF] block hover:bg-[#80B537] ${pathname == "/purchases/vendors" && "font-['Figtree-Bold']"}`}
            >
              Vendors
            </a>
            <a
              href="/purchases/bills"
              className={`border-b p-1 border-[#F0F0EF] block hover:bg-[#80B537] ${pathname == "/purchases/bills" && "font-['Figtree-Bold']"}`}
            >
              Bills
            </a>
          </div>
        )}

        <a
          href="/reports"
          className={`${pathname === "/reports" && "font-['Figtree-Bold']"} border-b p-1 border-[#F0F0EF] block hover:bg-[#80B537] `}
        >
          Report
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
