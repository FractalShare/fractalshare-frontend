/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { Spinner } from "@/components/common";
import { toast } from "react-toastify";
import Link from "next/link";
import { continueWithGoogle } from "@/utils";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "@/redux/features/authSlice";

export default function Login() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const [checked, setChecked] = useState(false);
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
          ...prevData,
          [name]: value,
      }))
  };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        login({ email, password })
            .unwrap()
            .then(() => {
                dispatch(setAuth());
                toast.success('Log in successful!')
                router.push('/home')
            })
            .catch(() => {
                toast.error('Failed to log in!')
            })
    }

    const [showPassword, setShowPassword] = useState(false);
    // const { data: session } = useSession(); // Get user session info
  
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };
      

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        {/* <header className="fixed top-0 left-0 w-full z-50 py-2 mt-10 flex justify-center items-center">
          <Image src="/rmd.png" alt="RMD Logo" className="filter invert" width={120} height={40} priority />
        </header> */}
  
        <div className="flex flex-row w-full">
          <div className="w-1/2 h-screen overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover pointer-events-none border-r border-black"
            >
              <source src="/videos/volcano.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex w-1/2 items-center justify-center">
            <div className="w-full p-12">
              <h1 className="text-[22px] mb-10">Log in to Fractal Share</h1>
      
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative flex flex-col">
                  <p className="mb-4 text-[18px]">Email Address</p>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                    className="w-full px-4 py-3 bg-white text-gray-700 border rounded-xl border-black focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="my-4 text-[18px]">Password</p>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      required
                      className="w-full px-4 pr-10 py-3 bg-white text-gray-700 rounded-xl border border-black focus:outline-none"
                    />

                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:scale-125 transition"
                    >
                      {showPassword ? <IoEyeOff size={17} /> : <IoEye size={17} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-5">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    className="rounded-xl bg-[#F3F3F3] focus:ring-primary accent-primary"
                  />
                  <span className="text-sm">Keep me logged in for 30 days</span>
                </div>

                {/* <div className="text-right">
                  <Link href="/password-reset" className="text-sm text-blue-500 hover:underline">
                    Forgot your password?
                  </Link>
                </div> */}
      
                <div className="flex flex-row gap-4">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-[16px] text-white rounded-full transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner sm /> : "Login"}
                  </button>

                  <button
                    type="button"
                    className="w-full px-6 py-3 text-primary text-[16px] rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    I need help
                  </button>
                </div>
              </form>
      
              <div className="relative flex py-8 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-3 text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <div className="flex justify-center">
                <button
                    className="flex items-center justify-center w-16 h-16 bg-red-700 bg-opacity-40 rounded-full hover:bg-opacity-40 hover:scale-110 transition-all duration-300"
                >
                    <FaGoogle size={30} onClick={continueWithGoogle} className="text-red-500" />
                </button>
              </div>
      
              <p className="text-[12px] mt-16">
                Not on Fractal Share?{" "}
                <a href="/auth/register" className="text-primary hover:underline">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}