import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Assets
import dropdownArrow from "../../../public/images/down_arrow.png";
import { ObjectData } from "../helper/types";

interface DropdownProps {
  options: ObjectData[];
  selected: string;
  placeholder?: boolean;
  onSelectChange: (option: ObjectData) => void;
}

export default function Dropdown({
  options,
  selected,
  placeholder,
  onSelectChange,
}: DropdownProps) {
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutClick);
    return () => {
      document.addEventListener("mousedown", handleOutClick);
    };
  }, []);

  const handleOutClick = (e: MouseEvent) => {
    if (
      dropDownRef.current &&
      !(dropDownRef.current as HTMLElement).contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleSelect = (option: ObjectData) => {
    setIsOpen(false);
    onSelectChange(option);
  };

  return (
    <div ref={dropDownRef} className="w-[400px] relative bg-white z-10">
      <div
        className="flex flex-row items-center bg-[#FFFDFC] cursor-pointer border-[#DEE0E8] border-[1px] rounded-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`flex flex-row placeholder:font-['Figtree-Medium'] placeholder:text-[13px] align-middle 
          ${placeholder ? "text-[#6D6D6D]" : ""} py-2 px-3`}
        >
          <p className="flex-1 text-[14px]">{selected}</p>
          <div className="absolute right-0 px-3">
            <Image width={20} src={dropdownArrow} alt="dropdown-arrow" />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="max-h-[150px] w-[400px] absolute top-full border border-gray-300 bg-white z-10 rounded overflow-y-auto max-h-40">
          {options.map((option, index) => (
            <div
              key={index}
              className="py-2 px-4 cursor-pointer hover:bg-[#FFFDFC] text-[14px]"
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
