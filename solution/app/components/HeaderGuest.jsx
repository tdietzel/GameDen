import React from 'react'
import Link from 'next/link'
import diceImage from '../public/img/dice.png'

export default function Header() {
  return (
    <>
      {/* GameDen Logo, Navigation & Login/Registration */}
      <div className="flex flex-row h-20 bg-black text-white">
        {/* GameDen Logo */}
        <div className="flex flex-row w-screen place-items-center place-content-center mx-20">
          <img src={diceImage.src} alt='image' className="w-12 h-12"/>
          <Link href='/' className="mr-5 font-bold place-items-baseline">GameDen</Link>
        </div>

        {/* Navigation */}
        <div className="w-screen place-items-center place-content-center mx-20">
          <Link href='/pages/games' className="mr-5 ml-10 text-lg">Games</Link>
          <Link href='/pages/groups' className="mr-5 text-lg">Groups</Link>
          <Link href='/pages/leaderboards' className="place-content-start text-lg">Leaderboards</Link>
        </div>

        {/* Login/Registration */}
        <div className="w-screen place-content-center">
          <Link href='/pages/login' className="mr-5">Login</Link>
          <Link href='/pages/register' className="mr-5 border-solid border-2 rounded-md p-3">Join Now</Link>
        </div>
      </div>
    </>
  );
}