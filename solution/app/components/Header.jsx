'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import characterIMG from '../public/img/character.png'
import coinIMG from '../public/img/dollar.png'
import diceIMG from '../public/img/dice.png'

export default function Header() {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const { data: session } = useSession();
  const [userData, setUserData] = useState({ coins: 0, email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        const res = await fetch('/api/user');
        const data = await res.json();
        setUserData(data);
      }
    };
    fetchUserData();
  }, [session]);

  function handleProfileDropdown() {
    setShowUserInfo(!showUserInfo);
  }

  const formatNumberWithCommas = (number) => {
    if (number === undefined || number === null || isNaN(number)) {
      return 'N/A';
    }

    return number.toLocaleString();
  };

  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center">
          <Image src={ diceIMG } alt='logo' width={40} height={40} />
          <Link href='/' className="ml-2 text-2xl font-bold font-header">
            GameDen
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6 font-body">
            <li>
              <Link href='/pages/games' className="hover:text-blue-400 transition-colors duration-300">
                Games
              </Link>
            </li>
            <li>
              <Link href='/pages/groups' className="hover:text-blue-400 transition-colors duration-300">
                Groups
              </Link>
            </li>
            <li>
              <Link href='/pages/leaderboards' className="hover:text-blue-400 transition-colors duration-300">
                Leaderboards
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center">
          <div className="mr-4 flex items-center">
            <p className="mr-2 font-body">{ userData.email }</p>
            <div className="flex items-center bg-blue-800 text-white rounded-lg px-2 py-1">
              <span>{formatNumberWithCommas(userData.coins)}</span>
              <Image src={ coinIMG } alt='coin' width={16} height={16} className="ml-1" />
            </div>
          </div>
          <div className="relative">
            <Image
              src={ characterIMG }
              alt='profile-picture'
              width={40}
              height={40}
              className="cursor-pointer rounded-full"
              onClick={handleProfileDropdown}
            />
            {showUserInfo && (
              <div className="absolute top-16 right-0 bg-gray-900 text-white rounded-xl shadow-lg py-2 w-32">
                <Link href='/pages/settings' className="block px-4 py-2 hover:bg-green-400 rounded-lg">
                  Settings
                </Link>
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="block px-4 py-2 hover:bg-red-400 w-full text-left rounded-lg"
                  >
                    Log Out
                  </button>
                ) : (
                  <div className="px-4 py-2">
                    <Link href='/pages/register' className="mr-2 hover:underline">
                      Register
                    </Link>
                    or
                    <Link href='/pages/login' className="ml-2 hover:underline">
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}