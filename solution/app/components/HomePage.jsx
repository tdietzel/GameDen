'use client'
import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import connectivityIMG from '../public/img/connectivity.png'
import comingSoonIMG from '../public/img/comingsoonbkg.jpg'
import blackjackIMG from '../public/img/blackjackbkg.jpg'
import rouletteIMG from '../public/img/roulettebkg2.png'
import spadesIMG from '../public/img/spadesbkg.jpg'
import unoIMG from '../public/img/unobkg.jpg'

export default function HomePage() {
  const router = useRouter();
  const games = [
    { id: 1, title: 'Blackjack', image: blackjackIMG, description: 'Card Game' },
    { id: 2, title: 'Roulette', image: rouletteIMG, description: 'Color/Number Wheel' },
    { id: 3, title: 'Spades', image: spadesIMG, description: 'Card Game' },
    { id: 4, title: 'Uno', image: unoIMG, description: 'Card Game' },
    { id: 5, title: 'New Game', image: comingSoonIMG, description: 'Releases 8/1/24' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsContainerRef = useRef(null);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? games.length - 4 : prevIndex - 1));
  }

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === games.length - 4 ? 0 : prevIndex + 1));
  }

  useEffect(() => {
    const container = cardsContainerRef.current;
    container.scrollLeft = currentIndex * (container.offsetWidth / 4);
  }, [currentIndex]);

  function handleRegister() {
    router.push('/pages/register');
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div className="flex flex-row items-center justify-between px-20 py-10">
        <div className="w-1/2 flex justify-center">
          <img src={connectivityIMG.src} alt='Community logo' className="w-1/2" />
        </div>
        <div className="w-1/2 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl text-white font-bold mb-4">
            <span className="text-purple-800">Game</span>
            <span className="text-red-500">Den </span>
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-red-600">Community</span>
          </h1>
          <h3 className="text-gray-300 font-bold text-lg md:text-xl mb-8">
            Create an account before
            <span className="text-yellow-500"> 6/30 </span>
            and receive
            <span className="text-yellow-500"> 10,000 coins! </span>
          </h3>
          <button onClick={handleRegister} className="bg-red-700 hover:bg-red-800 hover:border-blue-400 hover:text-green-400 rounded-2xl py-3 px-6 border-2 border-white text-white text-lg md:text-2xl">
            Join Community
          </button>
        </div>
      </div>

      <div className="flex-1 bg-gray-800 px-20 py-10">
        <h2 className="text-3xl md:text-4xl text-white text-center font-bold mb-8">Current Games</h2>
        <div className="flex justify-center">
          <div className="relative w-[76rem]">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={handlePrev}
                className="bg-gray-700 text-white rounded-full p-2 mx-2 hover:bg-gray-600 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div className="flex overflow-x-hidden justify-center" ref={ cardsContainerRef }>
              {games.slice(currentIndex, currentIndex + 4).map((game, index) => (
                <GameCard key={ index } game={ game } />
              ))}
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={handleNext}
                className="bg-gray-700 text-white rounded-full p-2 mx-2 hover:bg-gray-600 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tailwind Styling
const GameCard = ({ game }) => {
  return (
    <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden w-64 shrink-0 mx-2">
      <Image
        src={ game.image }
        alt={ game.title }
        width={256}
        height={144}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{ game.title }</h3>
        <p className="text-gray-300">{ game.description }</p>
      </div>
    </div>
  )
}