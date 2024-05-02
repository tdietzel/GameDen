import blackjackIMG from '../public/img/blackjackbkg.jpg'
import rouletteIMG from '../public/img/roulettebkg2.png'
import spadesIMG from '../public/img/spadesbkg.jpg'
import spadesMultiplayerIMG from '../public/img/spadesmultiplayerbkg.jpg'
import unoIMG from '../public/img/unobkg.jpg'
import unoMultiplayerIMG from '../public/img/unomultiplayerbkg.jpg'
import { useState } from 'react'

export default function SoloGames() {
  const soloGames = [
    { id: 1, title: 'Blackjack', image: blackjackIMG, description: 'Card Game', online: 12 },
    { id: 2, title: 'Roulette', image: rouletteIMG, description: 'Color/Number Wheel', online: 8 },
    { id: 3, title: 'Spades', image: spadesIMG, description: 'Card Game', online: 5 },
    { id: 4, title: 'Uno', image: unoIMG, description: 'Card Game', online: 20 },
  ]

  const multiplayerGames = [
    { id: 1, title: 'Spades Multiplayer', image: spadesMultiplayerIMG, description: 'Card Game', online: 15 },
    { id: 2, title: 'Uno Multiplayer', image: unoMultiplayerIMG, description: 'Card Game', online: 25 },
  ]

  const allGames = [...soloGames, ...multiplayerGames]

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredGames, setFilteredGames] = useState(allGames)
  const [activeTab, setActiveTab] = useState('all')

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)

    const filtered = (activeTab === 'all' ? allGames : activeTab === 'solo' ? soloGames : multiplayerGames).filter(
      (game) => game.title.toLowerCase().includes(term) || game.description.toLowerCase().includes(term)
    )
    setFilteredGames(filtered)
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    setSearchTerm('')
    setFilteredGames(tab === 'all' ? allGames : tab === 'solo' ? soloGames : multiplayerGames)
  }

  return (
    <>
      <div className="bg-black py-6 pl-16">
        <h1 className="text-5xl font-bold text-white text-center">
          Game Hub
        </h1>
      </div>
      <nav className="bg-gray-800 py-2 w-5/6 m-auto rounded-3xl">
        <div className="container mx-auto flex justify-center">
          <div className="flex space-x-4">
            <button
              onClick={() => handleTabClick('all')}
              className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-800 text-white hover:bg-gray-700'} transition-colors duration-300`}
            >
              All Games
            </button>
            <button
              onClick={() => handleTabClick('solo')}
              className={`px-4 py-2 rounded-md ${activeTab === 'solo' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-800 text-white hover:bg-gray-700'} transition-colors duration-300`}
            >
              Solo Games
            </button>
            <button
              onClick={() => handleTabClick('multiplayer')}
              className={`px-4 py-2 rounded-md ${activeTab === 'multiplayer' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-800 text-white hover:bg-gray-700'} transition-colors duration-300`}
            >
              Multiplayer Games
            </button>
          </div>
        </div>
        <div className="flex-1 mx-8 pt-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search games..."
              className="w-full py-2 px-4 rounded-full bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ searchTerm }
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </nav>
      <section className="container mx-auto py-12">
        <h2 className="text-3xl font-bold text-white mb-8">{activeTab === 'all' ? 'All Games' : activeTab === 'solo' ? 'Solo Games' : 'Multiplayer Games'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredGames.map((game, index) => (
            <div
              key={ index }
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 hover:cursor-pointer transition duration-300"
            >
              <img
                src={ game.image.src }
                alt={ game.title }
                className="w-full h-68 object-cover"
              />
                <div className="flex items-center justify-between mt-1 p-2">
                  <div className="flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mx-2"></div>
                    <p className="text-sm text-gray-400">{ game.online } online</p>
                  </div>
                  <button className="px-4 py-2 w-2/3 bg-green-500 text-black font-bold rounded hover:bg-green-600 transition-colors duration-300">
                    Play
                  </button>
                </div>
              </div>
          ))}
        </div>
      </section>
    </>
  )
}
// import Image from 'next/image'
// import React, { useState, useEffect, useRef } from 'react'
// import { useSession } from 'next-auth/react'

// const { data: session } = useSession();

// const handleUpdateStats = async (action) => {
//   try {
//     const res = await fetch('/api/user', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: session?.user?.email,
//         action,
//       }),
//     });

//     if (res.ok) {
//       console.log(`User stats updated for ${action}`);
//     } else {
//       console.error("Failed to update user stats");
//     }

//   } catch (error) {
//     console.error("Error updating user stats:", error);
//   }
// };

// const handleBlackjackWin = () => {
//   handleUpdateStats('blackjackWin');
// };

// const handleRouletteWin = () => {
//   handleUpdateStats('rouletteWin');
// };

// const handleSpadesWin = () => {
//   handleUpdateStats('spadesWin');
// };

// const handleUnoWin = () => {
//   handleUpdateStats('unoWin');
// };

// const handleLose = () => {
//   handleUpdateStats('lose');
// };