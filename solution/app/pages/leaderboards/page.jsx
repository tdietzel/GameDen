'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HeaderGuest from '../../components/HeaderGuest'
import Leaderboard from '../../components/Leaderboard'

export default function Leaderboards() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <>
          <Header />
          <Leaderboard />
          <Footer />
        </>
      ): (
        <>
          <HeaderGuest />
          <Leaderboard />
          <Footer />
        </>
      )}
    </>
  );
}