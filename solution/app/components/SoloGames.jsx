import React from 'react'
import { useSession } from 'next-auth/react'
import blackjackIMG from '../public/img/blackjack.png'
import rouletteIMG from '../public/img/roulette.png'
import spadesIMG from '../public/img/spades.png'
import unoIMG from '../public/img/uno.png'

export default function MultiplayerGames() {
  const { data: session } = useSession();

  const handleUpdateStats = async (action) => {
    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          action,
        }),
      });

      if (res.ok) {
        console.log(`User stats updated for ${action}`);
      } else {
        console.error("Failed to update user stats");
      }

    } catch (error) {
      console.error("Error updating user stats:", error);
    }
  };

  const handleBlackjackWin = () => {
    handleUpdateStats('blackjackWin');
  };

  const handleRouletteWin = () => {
    handleUpdateStats('rouletteWin');
  };

  const handleSpadesWin = () => {
    handleUpdateStats('spadesWin');
  };

  const handleUnoWin = () => {
    handleUpdateStats('unoWin');
  };

  const handleLose = () => {
    handleUpdateStats('lose');
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-1/3 mt-24 mb-32">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-6">Solo</h1>

          <div className="flex justify-center text-center">
            <div className="m-4 h-48 w-48 bg-black relative">
              <img src={ blackjackIMG.src } className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 hover:cursor-pointer">
                <h1 className="text-white font-bold text-3xl">
                  Blackjack
                </h1>
              </div>
              <button onClick={handleBlackjackWin} className="p-3 bg-green-700 text-white">
                Win
              </button>
              <button onClick={handleLose} className="p-3 bg-red-700 text-white">
                Lose
              </button>
            </div>
            <div className="m-4 h-48 w-48 bg-black relative">
              <img src={ rouletteIMG.src } className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 hover:cursor-pointer">
                <h1 className="text-white font-bold text-3xl">
                  Roulette
                </h1>
              </div>
              <button onClick={handleRouletteWin} className="p-3 bg-green-700 text-white">
                Win
              </button>
              <button onClick={handleLose} className="p-3 bg-red-700 text-white">
                Lose
              </button>
            </div>
            <div className="m-4 h-48 w-48 bg-black relative">
              <img src={ unoIMG.src } className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 hover:cursor-pointer">
                <h1 className="text-white font-bold text-3xl">
                  Uno
                </h1>
              </div>
              <button onClick={handleUnoWin} className="p-3 bg-green-700 text-white">
                Win
              </button>
              <button onClick={handleLose} className="p-3 bg-red-700 text-white">
                Lose
              </button>
            </div>
            <div className="m-4 h-48 w-48 bg-black relative">
              <img src={ spadesIMG.src } className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 hover:cursor-pointer">
                <h1 className="text-white font-bold text-3xl">
                  Spades
                </h1>
              </div>
              <button onClick={handleSpadesWin} className="p-3 bg-green-700 text-white">
                Win
              </button>
              <button onClick={handleLose} className="p-3 bg-red-700 text-white">
                Lose
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}