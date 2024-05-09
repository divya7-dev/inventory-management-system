"use client";
import { ObjectData } from "../helper/types";
import { useRef, useEffect } from "react";
import Image from "next/image";
import crossIcon from "../../../public/images/cross_mark.png";
import Dropdown from "./Dropdown";

const Modal = ({
  header,
  show,
  setShow,
  fields,
  onClose,
  options,
  submitData,
  setSubmitData,
}: {
  header: string;
  show: boolean;
  setShow: (show: boolean) => void;
  fields: ObjectData;
  onClose: (submiData: ObjectData) => void;
  options: ObjectData;
  submitData: ObjectData;
  setSubmitData: (data: ObjectData) => void;
}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: ObjectData) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  const handleOnSubmit = () => {
    setShow(false);
    onClose(submitData);
  };

  const handleClickOnCrossIcon = () => {
    setShow(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("[MODAL] ", submitData);

  const handleInput = (key: string, value: string) => {
    setSubmitData({
      ...submitData,
      [key]: value,
    });
  };

  const handleDropdown = (key: string, selected: ObjectData) => {
    const updatedPatientData = {
      ...submitData,
      [key]: selected.id,
      [key.replace("id", "name")]: selected.name,
    };
    setSubmitData(updatedPatientData);
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
                  {header}
                </p>
                <div
                  className="w-full flex flex-wrap  justify-between"
                  style={{ alignContent: "space-between" }}
                >
                  {fields?.fields.map((data: ObjectData, index: number) => (
                    <div key={index}>
                      {data.type != "dropdown" && (
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
                            className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[#adadad] placeholder:font-['Figtree-Light']"
                            placeholder={data.placeHolder}
                            value={submitData[data.key]}
                            onChange={(e) =>
                              handleInput(data.key, e.target.value)
                            }
                          />
                        </div>
                      )}
                      {data.type == "dropdown" &&
                        options &&
                        options.hasOwnProperty(data.key) &&
                        options[data.key]?.length > 0 && (
                          <div>
                            <label className="block text-gray-700 text-sm font-['Figtree-Bold'] mb-2">
                              {data.name}
                            </label>
                            <Dropdown
                              options={options[data.key]}
                              selected={
                                submitData[data.key.replace("id", "name")] ||
                                data.placeHolder
                              }
                              placeholder={data[data.key] ? false : true}
                              onSelectChange={(option: ObjectData) =>
                                handleDropdown(data.key, option)
                              }
                            />
                          </div>
                        )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-row-reverse mt-5">
                  <button
                    className="float-right bg-[#80B537] text-center text-[#ffffff] text-[14px] text-[050505] font-['Figtree-Regular'] 
                    py-1.5 px-2 rounded-sm mb-4"
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
