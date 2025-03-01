"use client"

import { useRouter } from "next/navigation";

const LOGIN_URL = "/api/login/";

export default function Login() {
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const jsonData = JSON.stringify(Object.fromEntries(formData));
      
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        };
      
        const response = await fetch(LOGIN_URL, requestOptions);
        if (response.ok) {
          console.log("Logged in");
          router.replace("/")
        }
    }
      

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <input type="username" name='username' placeholder="Username" className="w-full px-4 py-2 border rounded-md" required />
            <input type="password" name='password' placeholder="Password" className="w-full px-4 py-2 border rounded-md" required />

            <button
                type="submit"
                className="w-full px-6 py-3 bg-[#ff8080] text-white font-medium rounded-lg shadow-lg hover:bg-[#E31937] transition"
            >
                Login
            </button>
            </form>
        </div>
    )
}