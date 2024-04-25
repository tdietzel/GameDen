import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import coinIMG from '../public/img/dollar.png'
import trophyIMG from '../public/img/trophy.png'
import gameIMG from '../public/img/game.png'
import rouletteIMG from '../public/img/roulette.png'
import spadeIMG from '../public/img/spade.png'
import unoIMG from '../public/img/uno2.png'

export default function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);
  const [sortBy, setSortBy] = useState('maxCoins');

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const url = `/api/leaderboard${sortBy ? `?sortBy=${sortBy}` : ''}`;
        const response = await fetch(url);
        const data = await response.json();
        setTopUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching top users:', error);
        setTopUsers([]);
      }
    };

    fetchTopUsers();
  }, [sortBy]);

  const formatNumberWithCommas = (number) => {
    return number.toLocaleString();
  };

  const handleFilterClick = (sortCriteria) => {
    setSortBy(sortCriteria);
  };

  return (
    <>
      {/* Heading & Navigation */}
      <div className="h-screen bg-gray-700">
        <h1 className="text-center text-6xl text-red-700 font-bold pt-11">Leaderboards</h1>
        <div className="flex flex-wrap justify-center mt-8 text-white">
          {/* Navigation Links */}
          <Link href="#" onClick={() => handleFilterClick('maxCoins')} className="mr-5">Total Coins</Link>
          <Link href="#" onClick={() => handleFilterClick('wl')} className="mr-5">W/L Record</Link>
          <Link href="#" onClick={() => handleFilterClick('blackjack')} className="mr-5">Blackjack</Link>
          <Link href="#" onClick={() => handleFilterClick('roulette')} className="mr-5">Roulette</Link>
          <Link href="#" onClick={() => handleFilterClick('spades')} className="mr-5">Spades</Link>
          <Link href="#" onClick={() => handleFilterClick('uno')} className="mr-5">Uno</Link>
        </div>

        {/* Leaderboard Container */}
        <div className="bg-gray-900 w-4/5 mx-auto mt-8 p-4 rounded-lg shadow-lg">
          {/* Leaderboard List */}
          <ul>
            {Array.isArray(topUsers) && topUsers.map((user, index) => (
              <li key={ user._id } className="flex items-center justify-between py-2 border-b border-gray-800">
                <span className="text-lg text-white">{ index + 1 }.</span>
                <span className="text-lg text-white">{ user.screenName }</span>
                <span className="text-lg text-yellow-300 flex flex-row justify-center items-center font-bold">
                  {sortBy === 'wl' ?
                    <>
                      <p className='mr-5'>{user[sortBy].$numberDecimal}</p>
                      <img src={ trophyIMG.src } alt='Record' className='h-16 w-16' />
                    </>
                    :
                    sortBy === 'blackjack' ?
                    <>
                      <p className='mr-5'>{formatNumberWithCommas(user[sortBy] || user.blackjackWins)}</p>
                      <img src={ gameIMG.src } alt='BlackJack' className='h-16 w-16' />
                    </>
                    :
                    sortBy === 'roulette' ?
                    <>
                      <p className='mr-5'>{formatNumberWithCommas(user[sortBy] || user.rouletteWins)}</p>
                      <img src={ rouletteIMG.src } alt='Roulette' className='h-16 w-16' />
                    </>
                    :
                    sortBy === 'spades' ?
                    <>
                      <p className='mr-5'>{formatNumberWithCommas(user[sortBy] || user.spadesWins)}</p>
                      <img src={ spadeIMG.src } alt='Spades' className='h-16 w-16 padding-5 bg-white rounded-lg' />
                    </>
                    :
                    sortBy === 'uno' ?
                    <>
                      <p className='mr-5'>{formatNumberWithCommas(user[sortBy] || user.unoWins)}</p>
                      <img src={ unoIMG.src } alt='Uno' className='h-16 w-16' />
                    </>
                    :
                    <>
                      <p className='mr-5'>{formatNumberWithCommas(user[sortBy] || user.maxCoins)}</p>
                      <img src={ coinIMG.src } alt='Coin' className='h-16 w-16' />
                    </>
                  }
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}