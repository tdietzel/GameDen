import React from 'react'

export default function CurrentGames() {
  return (
    <>
      {/* Heading, Games & Announcements */}
      <div className="h-1/3 text-white text-center mt-10">
        {/* Heading */}
        <h1 className="display-flex text-center text-4xl text-red-700 font-bold pt-11">Current Games</h1>

        {/* Games */}
        <div className="w-screen flex flex-row place-content-center mt-5">
          <div className="bg-red-700 h-40 w-40 mr-5 flex justify-center items-center">
            <p className="text-center">Blackjack</p>
          </div>
          <div className="bg-green-600 h-40 w-40 mr-5 flex justify-center items-center">
            <p className="text-center">Roulette</p>
          </div>
          <div className="bg-white h-40 w-40 mr-5 flex justify-center items-center">
            <p className="text-center text-black">Uno</p>
          </div>
          <div className="bg-blue-800 h-40 w-40 mr-5 flex justify-center items-center">
            <p className="text-center">Spades</p>
          </div>
          <div className="bg-gray-900 h-40 w-40 mr-5 flex justify-center items-center">
            <p className="text-center">Coming soon.</p>
          </div>
        </div>
        
        {/* Announcements */}
        <h1 className="text-white text-center pt-11 text-xl"><span className="text-green-700">NEW GAMES</span> EVERY MONTH!</h1>
      </div>
    </>
  );
}