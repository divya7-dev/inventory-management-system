"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useState } from "react";
import eyeHidden from "../../../public/images/eye_hidden.png";
import eyeOpen from "../../../public/images/eye_open.png";
import Image from "next/image";
import loginBg from "../../../public/images/login_bg_removebg.png";
import bgHexegon from "../../../public/images/bg_hexegon.jpg";

const LoginButton = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { pending } = useFormStatus();
  const router = useRouter();
  const handleLogin = () => {
    console.log("email, pass ", email, password);
    if (
      email === "" ||
      email.trim() === "" ||
      password === "" ||
      password.trim() === ""
    ) {
      console.log("Email is empty or contains only whitespace");
    } else {
      router.push("/stocks");
    }
  };

  return (
    <button
      className="mt-10 w-full bg-[#80B537] text-center text-[#ffffff] rounded-md p-[9px] relative"
      aria-disabled={pending}
      onClick={handleLogin}
    >
      Log in
    </button>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <div className="absolute w-[100%] h-[100%]">
        <Image
          src={bgHexegon}
          alt="login background"
          className="object-center w-[100%] h-[100%] opacity-5"
        />
      </div>
      <div className="flex flex-row absolute ml-5 mt-5 left-0 top-0">
        <div>
          <Image
            width={90}
            height={90}
            src={loginBg}
            alt="login background"
            className="object-center"
          />
        </div>
        <p className="flex justify-center items-center font-['Figtree-Medium'] text-[#5e9116] text-[20px]">
          Inventory Management
          <br />
          System
        </p>
      </div>

      <div className="flex justify-center items-center h-screen bg-[#f2f2f2] ">
        <div>
          <div className="w-[450px] justify-center items-center rounded-lg bg-[#f2f2f2] px-6 pb-4 pt-8">
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border focus:outline-none border-gray-300 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500 bg-[#f2f2f2]"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="flex gap-3 items-center justify-center border border-gray-300 rounded-md relative">
                  <input
                    className="peer block w-full border-none rounded-md focus:outline-none py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500 bg-[#f2f2f2]"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                  />
                  <Image
                    width={30}
                    height={30}
                    className="inset-y-0 right-0 pr-3 flex items-center justify-center cursor-pointer"
                    src={showPassword ? eyeHidden : eyeOpen}
                    onClick={() => setShowPassword(!showPassword)}
                    alt="password eye icon"
                  />
                  <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            <LoginButton email={email} password={password} />
            <div className="flex h-8 items-end space-x-1">
              {/* {errorMessage && (
                  <>
                    <div className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  </>
                )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
