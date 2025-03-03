/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoEye, IoEyeOff  } from "react-icons/io5";
import { useRegisterMutation } from "../../../redux/features/authApiSlice";
import { toast } from "react-toastify";
import { Spinner } from "@/components/common";

export default function Register() {
    const router = useRouter();

    const [register, { isLoading }] = useRegisterMutation();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: ""
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const [showPassword, setShowPassword] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "password") {
            validatePassword(value);
        }
    };

    const validatePassword = (password: string) => {
        const length = password.length >= 10;
        const uppercase = /[A-Z]/.test(password);
        const lowercase = /[a-z]/.test(password);
        const number = /\d/.test(password);
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setPasswordCriteria({ length, uppercase, lowercase, number, specialChar });
        setPasswordValid(length && uppercase && lowercase && number && specialChar);
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!passwordValid) {
            toast.error("Please enter a strong password that meets all criteria.");
            return;
        }

        // router.push('/auth/survey')
        
        register({ first_name, last_name, email, password, re_password })
            .unwrap()
            .then(() => {
                toast.success('Please check email to verify account!')
                router.push('/auth/survey')
            })
            .catch(() => {
                toast.error('Failed to register account!')
            })
    }

    return (
        <div className="flex flex-col bg-[#FFFFFF]">
            <div className="flex flex-row bg-[#FFFFFF] w-full min-h-screen">
                <div className="w-1/2 h-screen border-r border-black">
                    <div className="flex flex-col h-full w-full">
                        <div className="flex-1 px-12 py-8">
                            <div className="flex items-center mb-6">
                                <Image src="/images/fs.svg" alt="Fractal Share Logo" width={150} height={150} priority />
                            </div>

                            <h1 className="text-[32px] mb-4 text-[#244E3B]">
                                Create Your Login
                            </h1>

                            <p className="text-[18px] text-black">
                                We will need your name, email address, and a unique password. You will use this login to access Fractal Share next time.
                            </p>
                        </div>

                        <div className="flex-1">
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full border-none object-cover pointer-events-none"
                            >
                                <source src="/videos/farm.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    </div>
                <div className="flex w-1/2 items-center justify-center">
                    <div className="max-w-xl">
                        <p className="text-[20px] text-gray-700 mb-16">
                            Enter your first and last name as they appear on your government ID.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4" id="register-form">
                            <div className="flex gap-4">
                                <div className="relative flex items-center w-1/2">
                                    <input
                                        type="text"
                                        name="first_name"
                                        placeholder="First name"
                                        required
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-gray-700 rounded-xl border border-black focus:outline-none"
                                    />
                                </div>

                                <div className="relative flex items-center w-1/2">
                                    <input
                                        type="text"
                                        name="last_name"
                                        placeholder="Last name"
                                        required
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-gray-700 rounded-xl border border-black focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="relative flex items-center">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-gray-700 rounded-xl border border-black focus:outline-none"
                                />
                            </div>

                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-gray-700 rounded-xl border border-black focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-4 text-black hover:scale-125 transition"
                                >
                                    {showPassword ? <IoEyeOff size={17} /> : <IoEye size={17} />}
                                </button>
                            </div>

                            {/* <div className="grid grid-cols-2 gap-3 text-sm">
                                {[
                                    { key: "lowercase", label: "One lowercase letter" },
                                    { key: "uppercase", label: "One uppercase letter" },
                                    { key: "number", label: "One number" },
                                    { key: "specialChar", label: "One special character" },
                                    { key: "length", label: "10 characters minimum" },
                                ].map(({ key, label }) => (
                                    <div key={key} className="flex items-center">
                                        {passwordCriteria[key as keyof typeof passwordCriteria] ? (
                                            <>
                                                <FaCheckCircle className="text-green-600" />
                                                <span className="ml-2 text-green-600">{label}</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaTimesCircle className="text-red-500" />
                                                <span className="ml-2 text-red-500">{label}</span>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div> */}

                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="re_password"
                                    placeholder="Confirm password"
                                    required
                                    value={formData.re_password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 text-gray-700 rounded-xl border border-black focus:outline-none"
                                />
                            </div>
                        </form>
                        <p className="text-black text-[12px] mt-16">
                            Already started?{" "}
                            <a href="/auth/login" className="text-primary hover:underline">
                            Log in to complete application
                            </a>
                        </p>
                        <p className="text-gray-400 text-[12px] mt-10">By continuing, you agree to the Fractal Share User Account Agreement and Privacy Policy. This site is protected by reCAPTCHA and the Google Privacy Policy. Terms of Service apply.</p>
                        <div className="flex justify-end mt-8">
                            <button
                                type="submit"
                                form="register-form"
                                className="px-6 py-3 font-medium text-[16px] rounded-full shadow-md bg-primary text-white transition-all duration-300 transform hover:scale-105"
                                disabled={isLoading}
                            >
                                {isLoading ? <Spinner sm /> : "Continue"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
