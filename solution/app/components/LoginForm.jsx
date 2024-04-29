'use client'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8 font-header">Login</h1>
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="mb-2">
              <label htmlFor="email" className="block font-bold mb-2 font-body">
                Email
              </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-2">
              <label htmlFor="username" className="block font-bold mb-2 font-body">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
              Login
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}

            <button type="button" onClick={() => signIn('google')}>
              Login with Google
            </button>

            <Link className="text-sm mt-3 text-right" href={"/pages/register"}>
              Don't have an account? <span className="underline">Register</span>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}