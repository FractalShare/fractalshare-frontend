"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Verify() {
    const router = useRouter();

    // Simulated email & phone from signup (Replace with actual user data)
    const [userData] = useState({
        email: "user@example.com", // Replace with actual user email from signup
        phone: "123-456-7890", // Replace with actual user phone from signup
    });

    const [verified, setVerified] = useState({
        email: false,
        phone: false,
    });

    const [selected2FA, setSelected2FA] = useState("email"); // Default to email 2FA
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        setCanSubmit(verified.email && verified.phone);
    }, [verified]);

    const handleVerify = (type: "email" | "phone") => {
        setVerified((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const handleSubmit = () => {
        if (canSubmit) {
            console.log("Verification complete!");
            router.replace("/dashboard"); // Redirect to next step
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#0d0d0d] via-[#0d0d0d] to-[#0d0d0d]">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 py-2 mt-10 flex justify-center items-center">
                <Image src="/images/rmd.png" alt="RMD Logo" className="filter invert" width={120} height={40} priority />
            </header>

            {/* Verification Box */}
            <div className="bg-[#0d0d0d] p-8 w-full max-w-xl mt-12">
                <h1 className="text-5xl mb-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a9e] via-[#fad0c4] to-[#fbc2eb]">
                    Verify Your Account
                </h1>

                {/* Email Verification */}
                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-500" size={20} />
                        <span className="text-white">{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {verified.email ? (
                            <span className="text-green-500 flex items-center gap-1">
                                <FaCheckCircle /> Verified
                            </span>
                        ) : (
                            <span className="text-red-500 flex items-center gap-1">
                                <FaTimesCircle /> Not Verified
                            </span>
                        )}
                        <button
                            onClick={() => handleVerify("email")}
                            className={`px-4 py-2 text-white font-medium rounded-lg transition ${
                                verified.email ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                            {verified.email ? "Unverify" : "Verify"}
                        </button>
                    </div>
                </div>

                {/* Phone Verification */}
                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                        <FaPhone className="text-gray-500" size={20} />
                        <span className="text-white">{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {verified.phone ? (
                            <span className="text-green-500 flex items-center gap-1">
                                <FaCheckCircle /> Verified
                            </span>
                        ) : (
                            <span className="text-red-500 flex items-center gap-1">
                                <FaTimesCircle /> Not Verified
                            </span>
                        )}
                        <button
                            onClick={() => handleVerify("phone")}
                            className={`px-4 py-2 text-white font-medium rounded-lg transition ${
                                verified.phone ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                            {verified.phone ? "Unverify" : "Verify"}
                        </button>
                    </div>
                </div>

                {/* 2FA Selection */}
                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-6">
                    <span className="text-white">Choose 2FA Method</span>
                    <div className="flex items-center gap-4">
                        <button
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                selected2FA === "email" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"
                            }`}
                            onClick={() => setSelected2FA("email")}
                        >
                            Email
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                selected2FA === "phone" ? "bg-blue-500 text-white" : "bg-gray-600 text-gray-300"
                            }`}
                            onClick={() => setSelected2FA("phone")}
                        >
                            Phone
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`w-full px-6 py-3 font-medium rounded-lg transition ${
                        canSubmit
                            ? "bg-[#ff8080] text-white hover:bg-[#E31937]"
                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
