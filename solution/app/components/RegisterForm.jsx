'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterForm() {
  const [screenName, setScreenName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!screenName || !email || !password) {
      setError("All fields are necessary.");
      return;
    }

    if (screenName.length < 4) {
      setError("Username must be at least 4 characters.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    const userExists = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const { user: existingUser } = await userExists.json();

    if (existingUser) {
      setError("User already exists.");
      return;
    }

    const res = await fetch('api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        screenName,
        email,
        password,
      }),
    });

    if (res.ok) {
      const form = e.target;
      form.reset();
      router.push('/pages/login');
    } else {
      console.log("User registration failed.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8 font-header">Create an account</h1>
        <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="mb-2">
              <label htmlFor='username' className="block font-bold mb-2 font-body">
                Username
              </label>
              <input
                onChange={(e) => setScreenName(e.target.value)}
                type='text'
                placeholder='Username'
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block font-bold mb-2 font-body">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                placeholder='Email'
                autoComplete='username'
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label htmlFor='password' className="block font-bold mb-2 font-body">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
                autoComplete='current-password'
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
              Register
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
            <Link className="text-sm mt-3 text-right" href={'/pages/login'}>
              Already have an account? <span className="underline">Login</span>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}