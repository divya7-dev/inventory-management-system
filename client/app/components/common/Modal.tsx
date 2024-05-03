"use client";
import { ObjectData } from "../helper/types";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import crossIcon from "../../../public/images/cross_mark.png";

const Modal = ({
  show,
  fields,
  handleClose,
}: {
  show: boolean;
  fields: ObjectData;
  handleClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [openingStocks, setOpeningStocks] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [price, setPrice] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleOnSubmit = () => {
    console.log("Clicked submit button");
    setIsOpen(false);
  };

  const handleClickOnCrossIcon = () => {
    console.log("Clicked cross icon");
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex flex-row-reverse">
        <button
          className=" bg-[#F3F8ED] hover:bg-[#80B537] hover:text-white hover:border-[#80B537] text-[14px] text-[050505] font-['Figtree-Regular'] py-1 px-2 border border-[#050505] rounded-sm"
          onClick={() => setIsOpen(true)}
        >
          Add Item
        </button>
      </div>
      {isOpen && (
        <div className="absolute  z-10 inset-0">
          <div className="flex items-center align-middle justify-center text-center h-screen">
            <div className="absolute inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              ref={popupRef}
              className=" bg-white text-[14px] text-[050505] border font-['Figtree-Regular'] align-bottom rounded-lg w-[1000px] h-fit shadow-xl transform "
            >
              <div className="p-10 w-full text-left">
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
                    " mb-10 text-gray-700 font-['Figtree-Bold'] text-lg"
                  }
                >
                  Add Item
                </p>
                <div
                  className="w-full flex flex-wrap  justify-between"
                  style={{ alignContent: "space-between" }}
                >
                  {fields?.stocks?.fields.map(
                    (data: ObjectData, index: number) => (
                      <div className="mb-4 w-[400px]">
                        <label
                          htmlFor={data.key}
                          className="block text-gray-700 text-sm font-['Figtree-Bold'] mb-2"
                        >
                          {data.name}
                        </label>
                        <input
                          type={data.type}
                          id={data.key}
                          className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder={data.placeHolder}
                          // value={itemName}
                          // onChange={(e) => setItemName(e.target.value)}
                        />
                      </div>
                    ),
                  )}
                </div>
                <div className="flex flex-row-reverse mt-5">
                  <button
                    className="hover:bg-[#80B537] hover:text-white hover:border-[#80B537] text-[14px] text-[050505] border font-['Figtree-Regular'] border-[#dedddd] py-1.5 px-4 rounded shadow"
                    onClick={handleOnSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

{
  /* <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">

                  <div className="w-full flex flex-wrap" style={{alignContent: "space-between"}}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-[300px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div> */
}
