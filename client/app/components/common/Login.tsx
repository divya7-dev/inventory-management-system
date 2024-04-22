"use client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/router";

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="mt-10 w-full bg-[#80B537] text-center rounded-md p-[9px]"
      aria-disabled={pending}
    >
      Log in
    </button>
  );
}

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="space-y-3 w-[450px]">
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
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
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
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <div className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <LoginButton />
          <div className="flex h-8 items-end space-x-1">
            {/* {errorMessage && (
            <>
              <div className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )} */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
