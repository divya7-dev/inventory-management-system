"use client";

import React from "react";
import { useState } from "react";
import arrow from "../../../public/images/down_arrow.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  const [isSalesClicked, setSalesClick] = useState<boolean>(
    pathname.includes("sales")
  );
  const [isPurchaseClicked, setPurchaseClick] = useState<boolean>(
    pathname.includes("purchases")
  );

  return (
    <div className="flex-row rounded-lg h-screen bg-green-50 w-52">
      <div className="text-lg gap-x-1.5 items-center text-black rounded-lg font-['Figtree-Regular'] ml-5">
        <div className="p-5 font-semibold font-serif">Dashboard</div>
        <a
          href="/stocks"
          className={`${pathname === "/stocks" && "font-['Figtree-Bold']"} border-b p-1 border-[#F0F0EF] block hover:bg-gray-400`}
        >
          Stock
        </a>

        <div
          className={`flex border-b p-1 border-[#F0F0EF] hover:bg-gray-400 cursor-pointer `}
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
          <div className="ml-10 mr-5 rounded-lg text-lg">
            <a
              href="/sales/customers"
              className={`border-b p-1 border-[#F0F0EF] block hover:bg-gray-400 ${pathname == "/sales/customers" && "font-['Figtree-Bold']"}`}
            >
              Customer
            </a>
            <a
              href="/sales/invoices"
              className={`border-b p-1 border-[#F0F0EF] block hover:bg-gray-400 ${pathname == "/sales/invoices" && "font-['Figtree-Bold']"}`}
            >
              Invoices
            </a>
          </div>
        )}

        <div
          className={`flex border-b p-1 border-[#F0F0EF] hover:bg-gray-400 cursor-pointer `}
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
          <div className="ml-10 mr-5 rounded-lg text-lg">
            <a
              href="/purchases/vendors"
              className={`border-b p-1 border-[#F0F0EF] block hover:bg-gray-400 ${pathname == "/purchases/vendors" && "font-['Figtree-Bold']"}`}
            >
              Vendors
            </a>
            <a
              href="/purchases/bills"
              className={`border-b p-1 border-[#F0F0EF] block hover:bg-gray-400 ${pathname == "/purchases/bills" && "font-['Figtree-Bold']"}`}
            >
              Bills
            </a>
          </div>
        )}

        <a
          href="/reports"
          className={`${pathname === "/reports" && "font-['Figtree-Bold']"} border-b p-1 border-[#F0F0EF] block hover:bg-gray-400 `}
        >
          Report
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
