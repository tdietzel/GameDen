import React from 'react'
import blackjackIMG from '../public/img/game.png'
import comingSoonIMG from '../public/img/coming-soon.png'
import rouletteIMG from '../public/img/roulette.png'
import spadesIMG from '../public/img/spades.png'
import unoIMG from '../public/img/uno.png'

const CurrentGames = () => {
  return (
    <div className="text-center text-white pt-44">
      <h1 className="text-4xl font-bold text-red-700 mb-8">Current Games</h1>

      <div className="flex justify-center flex-wrap gap-6">
        <GameCard bgClass="bg-red-700" imgSrc={ blackjackIMG.src } altText='Blackjack' gameName='Blackjack' />
        <GameCard bgClass="bg-green-600" imgSrc={ rouletteIMG.src } altText='Roulette' gameName='Roulette' />
        <GameCard bgClass="bg-white text-black" imgSrc={ unoIMG.src } altText='Uno' gameName='Uno' />
        <GameCard bgClass="bg-blue-900" imgSrc={ spadesIMG.src } altText='Spades' gameName='Spades' />
        <GameCard bgClass="bg-gray-900" imgSrc={ comingSoonIMG.src } altText='Coming Soon' gameName='Coming soon' />
      </div>
      
      <h2 className="text-xl text-white mt-12">
        <span className="text-green-700">NEW GAMES</span> EVERY MONTH!
      </h2>
    </div>
  );
};

// Tailwind CSS Styling
const GameCard = ({ bgClass, imgSrc, altText, gameName }) => {
  return (
    <div className={`flex flex-col justify-center items-center h-52 w-52 ${bgClass} rounded-lg p-4`}>
      <img src={ imgSrc } alt={ altText } className="h-24 w-24 mb-3" />
      <p className="text-center font-bold">{ gameName }</p>
    </div>
  );
};
export default CurrentGames;