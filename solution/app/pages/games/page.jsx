'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HeaderGuest from '../../components/HeaderGuest'
import Games from '../../components/Games'

export default function GamesHome() {
  const { data: session } = useSession();

  return (
    <>
      <div className="bg-black min-h-screen text-white">
        {session ? (
          <>
            <Header />
            <Games />
            <Footer />
          </>
        ) : (
          <>
            <HeaderGuest />
            <Games />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}