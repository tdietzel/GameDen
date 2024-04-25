import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import coinIMG from '../public/img/dollar.png'
import trophyIMG from '../public/img/trophy.png'
import gameIMG from '../public/img/game.png'
import rouletteIMG from '../public/img/roulette.png'
import spadeIMG from '../public/img/spade.png'
import unoIMG from '../public/img/uno2.png'
import goldIMG from '../public/img/medal.png'
import silverIMG from '../public/img/medal2.png'
import bronzeIMG from '../public/img/medal3.png'
import characterIMG from '../public/img/character.png'

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
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      {/* Heading & Navigation */}
      <div className="py-10 text-center">
        <h1 className="text-4xl font-bold text-red-700">Leaderboards</h1>
        <div className="flex justify-center mt-4 space-x-4">
          <FilterLink onClick={() => handleFilterClick('maxCoins')}>Total Coins</FilterLink>
          <FilterLink onClick={() => handleFilterClick('wl')}>W/L Record</FilterLink>
          <FilterLink onClick={() => handleFilterClick('blackjackWins')}>Blackjack</FilterLink>
          <FilterLink onClick={() => handleFilterClick('rouletteWins')}>Roulette</FilterLink>
          <FilterLink onClick={() => handleFilterClick('spadesWins')}>Spades</FilterLink>
          <FilterLink onClick={() => handleFilterClick('unoWins')}>Uno</FilterLink>
        </div>
      </div>

      {/* Leaderboard Container */}
      <div className="w-4/5 mx-auto p-4 rounded-lg bg-gray-800 shadow-lg">
        {/* Leaderboard List */}
        <ul>
          {topUsers.map((user, index) => (
            <li key={user._id} className="flex items-center justify-between py-3 border-b border-gray-700 hover:bg-slate-600 cursor-pointer rounded-lg">
              {index === 0 ? 
                <img className="h-10 w-10" src={ goldIMG.src } />
                  : index === 1 ?
                <img className="h-10 w-10" src={ silverIMG.src } />
                  : index === 2 ?
                <img className="h-10 w-10" src={ bronzeIMG.src } />
                  :
                <span className="text-4xl font-semibold text-white ml-2 mr-2">{index + 1}</span>
              }
              <span className="text-lg font-semibold text-white">
                <img className="h-10 w-10" src={ characterIMG.src } />
                {user.screenName}
              </span>
              <span className="flex items-center">
                {renderSortIcon(user)}
                {sortBy === 'wl' ? (
                  <p className="text-lg font-bold text-yellow-300 ml-3">{user[sortBy].$numberDecimal}</p>
                ) : (
                  <p className="text-lg font-bold text-yellow-300 ml-3 mr-2">{formatUserValue(user)}</p>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  function FilterLink({ children, onClick }) {
    return (
      <Link href="#" onClick={onClick} className="text-lg hover:text-red-700 cursor-pointer">
        {children}
      </Link>
    );
  }

  function renderSortIcon() {
    if (sortBy === 'wl') {
      return <img src={ trophyIMG.src } alt="Record" className="h-10 w-10" />;
    } else if (sortBy === 'blackjackWins') {
      return <img src={ gameIMG.src } alt="BlackJack" className="h-10 w-10" />;
    } else if (sortBy === 'rouletteWins') {
      return <img src={ rouletteIMG.src } alt="Roulette" className="h-10 w-10" />;
    } else if (sortBy === 'spadesWins') {
      return <img src={ spadeIMG.src } alt="Spades" className="h-10 w-10" />;
    } else if (sortBy === 'unoWins') {
      return <img src={ unoIMG.src } alt="Uno" className="h-10 w-10" />;
    } else {
      return <img src={coinIMG.src} alt="Coin" className="h-10 w-10" />;
    }
  }

  function formatUserValue(user) {
    const value = user[sortBy];
    return formatNumberWithCommas(value);
  }
}