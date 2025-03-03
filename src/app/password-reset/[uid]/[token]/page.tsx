"use client"

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { useResetPasswordConfirmMutation } from "@/redux/features/authApiSlice";
import { Spinner } from "@/components/common";
import { toast } from "react-toastify";

export default function ChangeOfResetPassword() {
    const router = useRouter();
    const { uid, token } = useParams();

    const [resetPasswordConfirm, { isLoading }] = useResetPasswordConfirmMutation();

	const [formData, setFormData] = useState({
		new_password: '',
		re_new_password: '',
	});
    
    const { new_password, re_new_password } = formData;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
  };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        resetPasswordConfirm({ uid, token, new_password, re_new_password })
            .unwrap()
            .then(() => {
                toast.success('Password reset successful!')
                router.push('/auth/login');
            })
            .catch(() => {
                toast.error('Failed to reset password!')
            })
    }

    const [showPassword, setShowPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="min-h-screen flex flex-col items-center bg-white">
  
        <div className="p-8 w-full max-w-3xl space-y-8 mt-16">
          <header className="w-full flex items-center">
            <Image src="/images/fs.svg" alt="Fractal Share Logo" width={150} height={150} priority />
          </header>
          <h1 className="text-[22px] mb-3">Change your password</h1>
  
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative flex flex-col">
                <p className="mb-4 text-[18px]">New password</p>
                <input
                    type={showPassword ? "text" : "password"}
                    name="new_password"
                    placeholder="New password"
                    onChange={handleChange}
                    value={formData.new_password}
                    required
                    className="w-full px-4 py-3 text-gray-700 rounded-xl border border-black focus:outline-none"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-[59px] text-black hover:scale-125 transition"
                >
                    {showPassword ? <IoEyeOff size={17} /> : <IoEye size={17} />}
                </button>
            </div>
            <div className="relative flex flex-col">
                <p className="mb-4 text-[18px]">Confirm new password</p>
                <input
                    type={showPassword ? "text" : "password"}
                    name="re_new_password"
                    placeholder="Confirm new password"
                    onChange={handleChange}
                    value={formData.re_new_password}
                    required
                    className="w-full px-4 py-3 text-gray-700 rounded-xl border border-black focus:outline-none"
                />
            </div>
  
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-center text-white font-medium rounded-full hover:scale-105 transition"
              disabled={isLoading}
            >
              {isLoading ? <Spinner sm/> : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    );
}