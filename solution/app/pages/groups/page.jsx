'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Header from '../../components/Header'
import HeaderGuest from '../../components/HeaderGuest'

export default function Groups() {
  const { data: session } = useSession();

  return (
    <>
    {session ? (
      <>
        <Header />
        <div>Groups</div>
      </>
    ) : (
      <>
        <HeaderGuest />
        <div>Groups</div>
      </>
    )}
    </>
  );
}