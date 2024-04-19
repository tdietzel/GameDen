'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter();

  function handleRegister() {
    router.push('/pages/register');
  }

  return (
    <>
      {/* Banner & Button */}
      <div className="h-1/3 p-20 text-white text-center mb-20">
        <h1 className="display-flex text-center text-8xl text-red-700 font-bold pt-11">GET YOUR FREE</h1>
        <h1 className="display-flex text-center text-8xl text-red-700 font-bold">1000 COINS</h1>
        <button onClick={handleRegister} className="bg-red-900 rounded-lg p-3 border-2 border-white mt-11">
          <h1 className="text-2xl">Play Now</h1>
          <p className="text-gray-400">Sign up takes less than 1 minute</p>
        </button>
      </div>
    </>
  );
}