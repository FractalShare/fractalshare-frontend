"use client"

import { useRouter } from "next/navigation";

// import { cookies } from "next/headers";

const LOGOUT_URL = "/api/logout/";

export default function Logout() {
    const router = useRouter();

    async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
      
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        };
      
        const response = await fetch(LOGOUT_URL, requestOptions);
        if (response.ok) {
          console.log("Logged out");
          router.replace("/login");
        }
    }
      

    return (
        <div>

            <button
                className="w-full px-6 py-3 bg-[#ff8080] text-white font-medium rounded-lg shadow-lg hover:bg-[#E31937] transition"
                onClick={handleClick}
            >
                Logout
            </button>
        </div>
    )
}