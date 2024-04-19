import React from 'react'
import Link from 'next/link'

export default function Leaderboard() {
  return (
    <>
      {/* Heading & Navigation */}
      <div className="h-screen bg-gray-700">
        <h1 className="display-flex text-center text-6xl text-red-700 font-bold pt-11">Leaderboards</h1>
        <div className="flex flex-wrap justify-center mt-8 text-white">
          <Link href='/pages/leaderboards/coins' className="mr-5">Total Coins</Link>
          <Link href='/pages/leaderboards/record' className="mr-5">W/L Record</Link>
          <Link href='/pages/leaderboards/blackjack' className="mr-5">Blackjack</Link>
          <Link href='/pages/leaderboards/roulette' className="mr-5">Roulette</Link>
          <Link href='/pages/leaderboards/spades' className="mr-5">Spades</Link>
          <Link href='/pages/leaderboards/uno' className="mr-5">Uno</Link>
        </div>
        <div className="bg-gray-900 w-4/5 h-4/6 mx-auto mt-5"></div>
      </div>
    </>
  );
}