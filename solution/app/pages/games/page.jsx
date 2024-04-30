'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HeaderGuest from '../../components/HeaderGuest'
import MultiplayerGames from '../../components/MultiplayerGames'
import SoloGames from '../../components/SoloGames'

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