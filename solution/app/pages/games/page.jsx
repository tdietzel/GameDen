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
      {session ? (
        <>
        <div className="bg-gray-200">
          <Header />
          <SoloGames />
          <hr className="border-solid border-black" />
          <MultiplayerGames />
          <Footer />
        </div>
        </>
      ) : (
        <>
          <HeaderGuest />
          <SoloGames />
          <MultiplayerGames />
          <Footer />
        </>
      )}
    </>
  );
}