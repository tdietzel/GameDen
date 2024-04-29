'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Header from '../../components/Header'
import HeaderGuest from '../../components/HeaderGuest'
import SoloGames from '../../components/SoloGames'
import MultiplayerGames from '../../components/MultiplayerGames'
import Footer from '../../components/Footer'

export default function Games() {
  const { data: session } = useSession();

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        {session ? (
          <>
            <Header />
            <SoloGames />
            <hr className="border-solid border-black" />
            <MultiplayerGames />
            <Footer />
          </>
        ) : (
          <>
            <HeaderGuest />
            <SoloGames />
            <MultiplayerGames />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}