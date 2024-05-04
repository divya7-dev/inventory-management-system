"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import crossIcon from "../../../public/images/cross_mark.png";

const DeletePopUp = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClickOutside = (event: any) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  const handleClickOnCrossIcon = () => {
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="absolute  z-10 inset-0">
          <div className="flex items-center align-middle justify-center text-center h-screen">
            <div className="absolute inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              ref={popupRef}
              className=" bg-white text-[14px] text-[050505] border font-['Figtree-Regular'] align-bottom rounded-lg w-[40%] h-fit shadow-xl transform "
            >
              <div className="p-5 w-full text-left">
                <Image
                  width={20}
                  height={20}
                  className="absolute top-0 right-0 m-2 cursor-pointer"
                  src={crossIcon}
                  onClick={handleClickOnCrossIcon}
                  alt="cross icon"
                ></Image>
                <p
                  className={
                    " mb-5 text-gray-700 font-['Figtree-Bold'] text-lg"
                  }
                >
                  Delete Confirmation
                </p>
                <p className={"text-gray-700"}>
                  Are you sure you want to delete this item?
                </p>
                <div>
                  <div className="flex flex-row-reverse gap-5 mt-16">
                    <button
                      className="float-right bg-white text-center text-[#050505] text-[14px] font-['Figtree-Regular'] border border-[#050505]
                    py-1.5 px-5 rounded-sm"
                      onClick={handleClickOnCrossIcon}
                    >
                      Cancel
                    </button>
                    <button
                      className="float-right bg-[#80B537] text-center text-[#ffffff] text-[14px] font-['Figtree-Regular'] 
                    py-1.5 px-5 rounded-sm"
                      onClick={handleClickOnCrossIcon}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletePopUp;
