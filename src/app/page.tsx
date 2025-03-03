/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

// import { useState } from 'react';
import Image from "next/image";
import { useState } from "react";
import useSWR from 'swr';
import { FaYoutube, FaTiktok, FaInstagram, FaXTwitter, FaLinkedin, FaUser, FaEnvelope } from "react-icons/fa6";

const fetcher = (url: string) => fetch(url).then(res => res.json());

const WAITLIST_API_URL = "/api/waitlists/"

export default function Home() {
  const {data, error, isLoading} = useSWR("/api/hello", fetcher)

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Failed to load</div>;

  const [page, setPage] = useState(0);
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')
    setErrors({})
    const formData = new FormData(event.currentTarget)
    const objectFromForm = Object.fromEntries(formData)
    const jsonData = JSON.stringify(objectFromForm)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    }
    const response = await fetch(WAITLIST_API_URL, requestOptions)
    if (response.status === 201 || response.status === 200) {
      setPage(1);
    } else {
      const data = await response.json()
      setErrors(data)
      if (!data.email) {
        console.log("There was an error with your request. Please try again.")
      }
    }
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#F8F5F2] via-[#F8F5F2] to-[#F8F5F2]">
      <header className="w-full flex justify-center items-center">
        <Image src="/fs.png" alt="Fractal Share Logo" width={120} height={10} priority />
      </header>

      <div className="" />
          <h5 className="text-mb mb-8 text-gray-600"><i>FractalShare</i> | Fractional Real Estate</h5>
          {page == 0 &&
          <><h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#056608] via-[#33A036] to-[#52C755]">Own Land. Build Wealth.</h1>
          <p className="mt-8 text-lg text-[#C49F56] max-w-2xl">
            FractalShare lets anyone invest in shares of real estate — starting with just $100 — by enabling fractional ownership of land and farmland.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 w-full max-w-xl space-y-4">
            <div className="relative flex items-center">
              <FaUser className="absolute left-3 text-gray-500" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-10 py-3 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6D5DFD]"
              />
            </div>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3 text-gray-500" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full px-10 py-3 text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6D5DFD]"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 border-2 border-[#1F4F36] text-[#1F4F36] font-medium rounded-lg hover:bg-[#1F4F36] hover:text-white transition">
              Join the Waitlist!
            </button>
          </form>

          <div className="mt-12 flex gap-8">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-red-600 bg-opacity-40 rounded-full hover:bg-opacity-40 hover:scale-110 transition-all duration-300">
              <FaYoutube size={28} className="text-red-600" />
            </a>

            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-gray-500 bg-opacity-40 rounded-full hover:bg-opacity-40 hover:scale-110 transition-all duration-300">
              <FaTiktok size={28} className="text-black" />
            </a>

            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-pink-500 bg-opacity-40 rounded-full hover:bg-opacity-40 hover:scale-110 transition-all duration-300">
              <FaInstagram size={28} className="text-pink-500" />
            </a>

            <a href="https://x.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-gray-400 bg-opacity-40 rounded-full hover:bg-opacity-40 hover:scale-110 transition-all duration-300">
              <FaXTwitter size={28} className="text-black" />
            </a>

            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-blue-700 bg-opacity-40 rounded-full hover:bg-opacity-40 hover:scale-110 transition-all duration-300">
              <FaLinkedin size={28} className="text-blue-700" />
            </a>
          </div></>}
          {page == 1 &&
          <><h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a9e] via-[#fad0c4] to-[#fbc2eb]">Thank You for Joining!</h1>
          <button className="w-full max-w-md mt-8 px-6 py-3 bg-[#ff8080] text-white font-medium rounded-lg shadow-lg hover:bg-[#E31937] transition"
            onClick={() => setPage(0)}>
            Join Another Account
          </button></>
          }

    </div>
  );
}
