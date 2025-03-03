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
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#0d0d0d] via-[#0d0d0d] to-[#0d0d0d]">
      <header className="fixed top-0 left-0 w-full bg-[#C0C0C0] z-50 py-2 flex justify-center items-center shadow-md shadow-white">
        <Image src="/rmd.png" alt="RMD Logo" width={120} height={40} priority />
      </header>

      <div className="mt-6" />
          <h5 className="text-mb mb-8 text-gray-600"><i>RMD</i> | Decentralized Commodity Trading</h5>
          {page == 0 &&
          <><h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff9a9e] via-[#fad0c4] to-[#fbc2eb]">Your Market. Your Rules.</h1>
          <p className="mt-8 text-lg text-[#C0C0C0] max-w-2xl">
            Be first to be part of the future of decentralized energy with efficient trading, easy profits, and little to no fees.
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
              className="w-full px-6 py-3 bg-[#ff8080] text-white font-medium rounded-lg shadow-lg hover:bg-[#E31937] transition">
              Join the Waitlist!
            </button>
          </form>

          <div className="mt-12 flex gap-8">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-red-600 bg-opacity-40 rounded-full hover:bg-opacity-40 hover:scale-110 transition-all duration-300">
              <FaYoutube size={28} className="text-red-600" />
            </a>

            <a href="https://www.tiktok.com/@rmd.enterprises?_t=ZT-8uAm1fYdRFL&_r=1" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-40 rounded-full hover:bg-opacity-40 hover:scale-110 transition-all duration-300">
              <FaTiktok size={28} className="text-black" />
            </a>

            <a href="https://www.instagram.com/rmd.enterprises?igsh=MTNnNHg1Z2FnZ2RlZQ==" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-pink-500 bg-opacity-40 rounded-full hover:bg-opacity-40 hover:scale-110 transition-all duration-300">
              <FaInstagram size={28} className="text-pink-500" />
            </a>

            <a href="https://x.com/rmd_enterprises?s=11&t=mbVaBDSCD-A1AhWECkxgUQ" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-40 rounded-full hover:bg-opacity-40 hover:scale-110 transition-all duration-300">
              <FaXTwitter size={28} className="text-black" />
            </a>

            <a href="https://www.linkedin.com/in/rmd-enterprises-b559a7352?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer"
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
