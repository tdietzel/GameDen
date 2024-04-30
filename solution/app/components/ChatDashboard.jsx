import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import beginnerLuckIMG from '../public/img/clover.png'
import championIMG from '../public/img/swordsman.png'
import champIMG from '../public/img/trophey.png'
import coinCollectorIMG from '../public/img/coin.png'
import coinConquerorIMG from '../public/img/treasure.png'
import dedicatedGamerIMG from '../public/img/battle.png'
import evenStevenIMG from '../public/img/avatar.png'
import firstWinIMG from '../public/img/flag.png'
import gameEnthusiastIMG from '../public/img/general1.png'
import gameMarathonerIMG from '../public/img/gamer.png'
import gameNoviceIMG from '../public/img/newbie1.png'
import goldenHoarderIMG from '../public/img/money1.png'
import highRollerIMG from '../public/img/high-roller.png'
import masterGamerIMG from '../public/img/cool2.png'
import millionairesClubIMG from '../public/img/money.png'
import positiveOutlookIMG from '../public/img/attract.png'
import seasonedCompetitorIMG from '../public/img/versus.png'
import seasonedPlayerIMG from '../public/img/astronaut.png'
import treasureHunterIMG from '../public/img/gold.png'
import unstoppableForceIMG from '../public/img/cool.png'
import unlockedIMG from '../public/img/unlocked.png'
import veteranPlayerIMG from '../public/img/general.png'
import victoriousNoviceIMG from '../public/img/newbie.png'
import victoryVirtuosoIMG from '../public/img/victory.png'

const achievementsData = [
  { id: 1, name: "Beginner's Luck", description: 'Win your first game', image: beginnerLuckIMG, condition: (wins) => wins >= 1 },
  { id: 2, name: 'Champ', description: 'Reached above 3.0 W/L', image: champIMG, condition: (wl) => wl >= 3 },
  { id: 3, name: 'Champion', description: 'Win 100 games', image: championIMG, condition: (wins) => wins >= 100 },
  { id: 4, name: 'Coin Collector', description: 'Accumulate 1,000 coins', image: coinCollectorIMG, condition: (maxCoins) => maxCoins >= 1000 },
  { id: 5, name: 'Coin Conqueror', description: 'Reach 50,000 coins', image: coinConquerorIMG, condition: (maxCoins) => maxCoins >= 50000 },
  { id: 6, name: 'Dedicated Gamer', description: 'Play 1000 games', image: dedicatedGamerIMG, condition: (gamesPlayed) => gamesPlayed >= 1000 },
  { id: 7, name: 'Even Steven', description: 'Achieve a 1:1 W/L', image: evenStevenIMG, condition: (wl) => (wl >= 1 && wl < 2) },
  { id: 8, name: 'First Win', description: 'Win your first game', image: firstWinIMG, condition: (wins) => wins >= 1 },
  { id: 9, name: 'Game Enthusiast', description: 'Reach 500 games played', image: gameEnthusiastIMG, condition: (gamesPlayed) => gamesPlayed >= 500 },
  { id: 10, name: 'Game Marathoner', description: 'Participate in 5000 games', image: gameMarathonerIMG, condition: (gamesPlayed) => gamesPlayed >= 5000 },
  { id: 11, name: 'Game Novice', description: 'Play 10 games', image: gameNoviceIMG, condition: (gamesPlayed) => gamesPlayed >= 10 },
  { id: 12, name: 'Golden Hoarder', description: 'Accumulate 100,000 coins', image: goldenHoarderIMG, condition: (maxCoins) => maxCoins >= 100000 },
  { id: 13, name: 'High Roller', description: 'Reach 10,000 coins', image: highRollerIMG, condition: (maxCoins) => maxCoins >= 10000 },
  { id: 14, name: 'Master Gamer', description: 'Win 1000 games', image: masterGamerIMG, condition: (wins) => wins >= 1000 },
  { id: 15, name: "Millionaire's Club", description: 'Gather 1,000,000 coins', image: millionairesClubIMG, condition: (maxCoins) => maxCoins >= 1000000 },
  { id: 16, name: 'Positive Outlook', description: 'Maintain a W/L ratio above 1.5', image: positiveOutlookIMG, condition: (wl) => wl > 1.5 },
  { id: 17, name: 'Seasoned Competitor', description: 'Participate in 50 games', image: seasonedCompetitorIMG, condition: (gamesPlayed) => gamesPlayed >= 50 },
  { id: 18, name: 'Seasoned Player', description: 'Win 50 games', image: seasonedPlayerIMG, condition: (wins) => wins >= 50 },
  { id: 19, name: 'Treasure Hunter', description: 'Gather 5,000 coins', image: treasureHunterIMG, condition: (maxCoins) => maxCoins >= 5000 },
  { id: 20, name: 'Unstoppable Force', description: 'Win 500 games', image: unstoppableForceIMG, condition: (wins) => wins >= 500 },
  { id: 21, name: 'Veteran Player', description: 'Reach 100 games played', image: veteranPlayerIMG, condition: (gamesPlayed) => gamesPlayed >= 100 },
  { id: 22, name: 'Victorious Novice', description: 'Win 10 games', image: victoriousNoviceIMG, condition: (wins) => wins >= 10 },
  { id: 23, name: 'Victory Virtuoso', description: 'Achieve a W/L ratio of 2.0 or higher', image: victoryVirtuosoIMG, condition: (wl) => wl >= 2 },
];

export default function ChatBarDashboard() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        const res = await fetch('/api/user');
        const data = await res.json();
        setUserData(data);
        
      const updatedAchievements = achievementsData.filter((achievement) => {
        switch (achievement.name) {
          case "Beginner's Luck":
            return achievement.condition(data.wins);
          case 'Champ':
            return achievement.condition(data.wl);
          case 'Champion':
            return achievement.condition(data.wins);
          case 'Coin Collector':
            return achievement.condition(data.maxCoins);
          case 'Dedicated Gamer':
            return achievement.condition(data.totalGamesPlayed);
          case 'Even Steven':
            return achievement.condition(data.wl);
          case 'First Win':
            return achievement.condition(data.wins);
          case 'Game Enthusiast':
            return achievement.condition(data.totalGamesPlayed);
          case 'Game Marathoner':
            return achievement.condition(data.totalGamesPlayed);
          case 'Game Novice':
            return achievement.condition(data.totalGamesPlayed);
          case 'Golden Hoarder':
            return achievement.condition(data.maxCoins);
          case 'High Roller':
            return achievement.condition(data.maxCoins);
          case 'Master Gamer':
            return achievement.condition(data.wins);
          case "Millionaire's Club":
            return achievement.condition(data.maxCoins);
          case 'Positive Outlook':
            return achievement.condition(data.wl);
          case 'Seasoned Competitor':
            return achievement.condition(data.totalGamesPlayed);
          case 'Seasoned Player':
            return achievement.condition(data.wins);
          case 'Treasure Hunter':
            return achievement.condition(data.maxCoins);
          case 'Unstoppable Force':
            return achievement.condition(data.wins);
          case 'Veteran Player':
            return achievement.condition(data.totalGamesPlayed);
          case 'Victorious Novice':
            return achievement.condition(data.wins);
          case 'Victory Virtuoso':
            return achievement.condition(data.wl);
          default:
            return false;
        }
      });
        setAchievements(updatedAchievements);
      }
    };
    fetchUserData();
  }, [session]);

  const calculateProgress = () => {
    const { exp, expToNextLevel } = userData;
    if (expToNextLevel === 0) {
      return 100;
    }
    return Math.round((exp / expToNextLevel) * 100);
  };

  const formatNumberWithCommas = (number) => {
    if (number === undefined || number === null || isNaN(number)) {
      return 'N/A';
    }
    return number.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Dashboard */}
      <div className="flex-1 p-4 md:p-8 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 font-header">Welcome back, { userData.name }</h1>
          <h2 className="text-3xl font-bold mt-8 text-center font-header">Level { userData.level }</h2>
          <div className="w-full max-w-md mx-auto mb-8">
            <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-green-500 transition-width duration-300 ease-in-out"
                style={{ width: `${calculateProgress()}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-black font-bold font-body">
                {calculateProgress()}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* User Stats/Achievements */}
      <div className="bg-gray-900 p-8 rounded-lg flex flex-col md:flex-row justify-center">
        <div className="md:w-1/3 flex flex-col items-center mb-8 md:mb-0">
          <div className="flex flex-col text-white text-lg border-2 border-white p-6 rounded-lg shadow-lg font-body bg-gray-800 transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <h1 className="bg-gradient-to-r from-blue-800 to-purple-600 text-white font-bold text-3xl py-2 px-4 rounded-lg mb-4 font-header text-center">
              Overall Stats
            </h1>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <StatItem label='Wins' value={ userData.wins } />
              <StatItem label='Losses' value={ userData.loses } />
              <StatItem label='W/L Ratio' value={ userData.wl !== undefined ? userData.wl.toFixed(1) : 'N/A'} />
              <StatItem label='Most Coins' value={formatNumberWithCommas(userData.maxCoins)} />
              <StatItem label='Games Played' value={ userData.totalGamesPlayed } />
            </div>
            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                View Achievements
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 flex flex-col items-center">
          <h1 className="flex flex-row bg-gradient-to-r from-blue-800 to-purple-600 text-white font-bold text-3xl py-2 px-4 rounded-lg mb-4 font-header">
            Achievement Showcase <p className="ml-5 italic text-yellow-400 ">{ achievements.length }/24</p>
            <img className="h-8 w-8" src={ unlockedIMG.src } />
          </h1>
          <div className="flex flex-wrap justify-center hover:cursor-pointer">
            {achievements.length === 0 ? (
              <p className="text-gray-400 font-body">No Achievements</p>
            ) : (
              achievements.map((achievement) => (
                <div key={ achievement.id } className="flex flex-col items-center mx-4 mb-4 achievement-card transition-all duration-300 hover:scale-105">
                  <img src={ achievement.image.src } alt={ achievement.name } className="h-16 w-16 rounded-full shadow-lg" />
                  <span className="text-white text-center mt-2 font-header">{ achievement.name }</span>
                  <span className="text-gray-400 text-center font-body">{ achievement.description }</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );  
}

// Tailwind CSS Styling
const StatItem = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <p className="text-center font-bold text-lg">{ label }</p>
      <p className="text-center text-xl">{ value }</p>
    </div>
  );
};

// WIP Below: Global and private chat section
// ------------------------------------------------------------------------------------------------- //
      // const [messages, setMessages] = useState([]);
      // const [newMessage, setNewMessage] = useState('');
        // Chat Feed 
        // <div className="md:w-1/2 p-4 rounded-lg bg-gray-800">
        //   <div className="flex justify-center items-center mb-4">
        //     <h1 className="text-3xl">Global Chat</h1>
        //   </div>
        //   <div className="h-64 overflow-auto">
        //     {messages.map((message, index) => (
        //       <div key={ index } className="mb-2 p-2 rounded-md bg-gray-700">
        //         <span className="text-gray-400">{ message.timestamp }</span>
        //         <p className="text-white">
        //           <span className="text-blue-400 font-bold">{ userData.name }:</span> { message.text }
        //         </p>
        //       </div>
        //     ))}
        //   </div>
        //   <div className="mt-4">
        //     <input
        //       type="text"
        //       value={ newMessage }
        //       onChange={handleMessageChange}
        //       placeholder="Type your message..."
        //       className="w-full p-2 border rounded text-black bg-gray-200"
        //     />
        //     <button
        //       onClick={handleSendMessage}
        //       className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-300"
        //     >
        //       Send
        //     </button>
        //   </div>
        // </div>

          // const handleMessageChange = (e) => {
          //   setNewMessage(e.target.value);
          // };

          // const handleSendMessage = () => {
          //   if (newMessage.trim() !== '') {
          //     const message = {
          //       text: newMessage,
          //       timestamp: new Date().toLocaleTimeString(),
          //     };
          //     setMessages([...messages, message]);
          //     setNewMessage('');
          //   }
          // };