import React from 'react'
import blackjackIMG from '../public/img/blackjack.png'
import rouletteIMG from '../public/img/roulette.png'
import unoIMG from '../public/img/uno.png'
import spadesIMG from '../public/img/spades.png'

export default function MultiplayerGames() {
  return (
    <>
      {/* Solo Container & Games */}
      <div className="flex flex-col items-center justify-center h-1/3 mt-24 mb-32">
        {/* Solo Container */}
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-6">Solo</h1>

          {/* Games */}
          <div className="flex justify-center">
            <div className="m-4 h-48 w-48 bg-black relative">
              <img src={ blackjackIMG.src } className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 hover:cursor-pointer">
                <h1 className="text-white font-bold text-3xl">
                  Blackjack
                </h1>
              </div>
            </div>
            <div className="m-4 h-48 w-48 bg-black relative">
              <img src={ rouletteIMG.src } className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 hover:cursor-pointer">
                <h1 className="text-white font-bold text-3xl">
                  Roulette
                </h1>
              </div>
            </div>
            <div className="m-4 h-48 w-48 bg-black relative">
              <img src={ unoIMG.src } className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 hover:cursor-pointer">
                <h1 className="text-white font-bold text-3xl">
                  Uno
                </h1>
              </div>
            </div>
            <div className="m-4 h-48 w-48 bg-black relative">
              <img src={ spadesIMG.src } className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 hover:cursor-pointer">
                <h1 className="text-white font-bold text-3xl">
                  Spades
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}