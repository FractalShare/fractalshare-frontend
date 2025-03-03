"use client"

import { useState } from "react";
import Image from "next/image";
import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { Spinner } from "@/components/common";
import { toast } from "react-toastify";

export default function ResetPassword() {
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    
    const [email, setEmail] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
  };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        resetPassword(email)
            .unwrap()
            .then(() => {
                toast.success('Request sent. Check email for link!')
            })
            .catch(() => {
                toast.error('Failed to send request!')
            })
    }

    return (
      <div className="min-h-screen flex flex-row mt-24 justify-center bg-white">
        <div className="max-w-3xl">
          <header className="w-full z-50 py-2 flex p-8">
            <Image src="/images/fs.svg" alt="Fractal Share Logo" width={150} height={150} priority />
          </header>
    
          <div className="p-8 w-full mt-4">
            <h1 className="text-[22px] mb-3">Reset your password</h1>
            <p className="text-[18px] text-black">
              Please enter the email address associated with your account. We’ll send you an email with instructions on how to reset your password.
            </p>
    
            <form onSubmit={handleSubmit} className="space-y-14 mt-10">
              <div className="relative flex flex-col">
                <p className="mb-4 text-[18px]">Email Address</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  onChange={handleChange}
                  value={email}
                  required
                  className="w-full px-4 py-3 text-gray-700 rounded-xl border border-black focus:outline-none"
                />
              </div>

              <div className="w-full flex justify-start">
                <button
                  type="submit"
                  className="w-1/5 px-6 py-3 bg-primary text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner sm/> : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}