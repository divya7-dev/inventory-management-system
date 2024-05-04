"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useState } from "react";
import eyeHidden from "../../../public/images/eye_hidden.png";
import eyeOpen from "../../../public/images/eye_open.png";
import Image from "next/image";

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
      className="mt-10 w-full bg-[#80B537] text-center text-[#ffffff] rounded-md p-[9px]"
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
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="space-y-3 w-[450px]">
          <div className="flex-1 rounded-lg bg-white px-6 pb-4 pt-8">
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
                    className="peer block w-full rounded-md border focus:outline-none border-gray-200 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
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
                <div className="flex gap-3 items-center justify-center border border-gray-200 rounded-md">
                  <input
                    className="peer block w-full border-none rounded-md focus:outline-none py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
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
