"use client";

import React from "react";
import { useState } from "react";
import arrow from "../../../public/images/down_arrow.png";
import Image from "next/image";
import { useRouter } from "next/router";

function Sidebar() {
  const [isSalesClicked, setSalesClick] = useState(false);
  const [isPurchaseClicked, setPurchaseClick] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const handleDropdownOptionClick = (event: any) => {
    event.preventDefault();
    const router = useRouter();
    const href = event.target.getAttribute("href");
    router.push(href);
  };

  const handleItemClick = (item: any) => {
    setActiveItem(item);
  };

  return (
    <div className="flex-row rounded-lg h-screen bg-green-50 w-52">
      <div className="text-lg gap-x-1.5 items-center text-black rounded-lg font-['Figtree-Regular'] ml-5">
        <div className="p-5 font-semibold font-serif">Dashboard</div>
        <a
          href="/stocks"
          onClick={() => handleItemClick("stocks")}
          className={`${activeItem === "stocks" ? "font-['Figtree-Bold']" : ""} border-b p-1 border-[#F0F0EF] block hover:bg-gray-400`}
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
              onClick={handleDropdownOptionClick}
              className="border-b p-1 border-[#F0F0EF] block hover:bg-gray-400 "
            >
              Customer
            </a>
            <a
              href="/sales/invoices"
              className="border-b p-1 border-[#F0F0EF] block hover:bg-gray-400 "
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
              className="border-b p-1 border-[#F0F0EF] block hover:bg-gray-400 "
            >
              Vendors
            </a>
            <a
              href="/purchases/bills"
              className="border-b p-1 border-[#F0F0EF] block hover:bg-gray-400 "
            >
              Bills
            </a>
          </div>
        )}

        <a
          href="/reports"
          className="border-b p-1 border-[#F0F0EF] block hover:bg-gray-400 "
        >
          Report
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
