import React, { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import diceIMG from '../public/img/dice.png'
import characterIMG from '../public/img/character.png'
import coinIMG from '../public/img/dollar.png'
import Link from 'next/link'

export default function Header() {
  const [showUserInfo, setShowUserInfo] = useState(false)
  const { data: session } = useSession()
  const [userData, setUserData] = useState({ coins: 0, email: '' })

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        const res = await fetch('/api/user')
        const data = await res.json()
        setUserData(data)
      }
    }
    fetchUserData()
  }, [session])

  function handleProfileDropdown() {
    setShowUserInfo(!showUserInfo)
  }

  const formatNumberWithCommas = (number) => {
    if (number === undefined || number === null || isNaN(number)) {
      return 'N/A';
    }
    
    return number.toLocaleString();
  };

  return (
    <>
      {/* GameDen Logo, Navigation & User Info */}
      <div className="flex flex-row h-20 bg-black text-white">
        {/* GameDen Logo */}
        <div className="flex flex-row w-screen place-items-center place-content-center mx-20">
          <img src={ diceIMG.src } alt='logo' className="w-12 h-12"/>
          <Link href='/' className="mr-5 font-bold place-items-baseline">GameDen</Link>
        </div>

        {/* Navigation */}
        <div className="w-screen place-items-center place-content-center mx-20">
          <Link href='/pages/games' className="mr-5 ml-10 text-lg">Games</Link>
          <Link href='/pages/groups' className="mr-5 text-lg">Groups</Link>
          <Link href='/pages/leaderboards' className="place-content-start text-lg">Leaderboards</Link>
        </div>

        {/* User Info */}
        <div className="flex items-center mr-5">
          <h1 className="text-center mr-5">{ userData.email }</h1>
          <div className="border-2 rounded-lg p-3 pr-9 flex items-center">
            <p>{formatNumberWithCommas(userData.coins)}</p>
            <img src={ coinIMG.src } alt="coin" className="w-5 h-5 ml-1" />
          </div>
        </div>
        <img onClick={handleProfileDropdown} src={ characterIMG.src } alt='profile-picture' className="cursor-pointer"/>
        
        {/* Might be able to remove bottom section and replace with null? */}
        {showUserInfo && (
          <div className="absolute top-24 right-0 w-48 bg-white rounded-lg shadow-lg z-10">
          {session ? (
            <button
              onClick={() => signOut()}
              className="absolute bg-red-500 text-white font-bold px-6 py-2 mt-3"
            >Log Out</button>
          ) :
          (
            <h1 className="grid place-items-end mr-5 font-bold"><Link href='/pages/register'>Register</Link> or <Link href='/pages/login'>Sign In</Link></h1>
          )}
          </div>
        )}
      </div>
    </>
  );
}