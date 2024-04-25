import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import champIMG from '../public/img/trophey.png'
import firstWinIMG from '../public/img/flag.png'
import evenStevenIMG from '../public/img/avatar.png'
import highRollerIMG from '../public/img/high-roller.png'

const achievementsData = [
  { id: 1, name: 'First Win', description: 'Win your first game', image: firstWinIMG, condition: (wins) => wins >= 1 },
  { id: 2, name: 'High Roller', description: 'Reach 10,000 coins', image: highRollerIMG, condition: (maxCoins) => maxCoins >= 10000 },
  { id: 3, name: 'Champ', description: 'Reached above 3.0 W/L', image: champIMG, condition: (wl) => wl >= 3 },
  { id: 4, name: 'Even Steven', description: 'Achieve a 1:1 W/L', image: evenStevenIMG, condition: (wl) => (wl >= 1 && wl < 2)}
];

export default function ChatBarDashboard() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
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
            case 'First Win':
              return achievement.condition(data.wins);
            case 'High Roller':
              return achievement.condition(data.maxCoins);
            case 'Champ':
              return achievement.condition(data.wl);
            case 'Even Steven':
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

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = {
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const calculateProgress = () => {
    const { exp, expToNextLevel } = userData;
    if (expToNextLevel === 0) {
      return 100;
    }
    return (exp / expToNextLevel) * 100;
  };

  const formatNumberWithCommas = (number) => {
    if (number === undefined || number === null || isNaN(number)) {
      return 'N/A';
    }
    
    return number.toLocaleString();
  };

  return (
    <>
      {/* Dashboard, Chat Feed & User Stats/Achievements */}
      <div className="h-screen flex flex-col bg-blue-400">
        {/* Dashboard & Chat Feed */}
        <div className="flex flex-row h-2/3">
          {/* Dashboard */}
          <div className="w-1/2 h-full p-4 bg-blue-400">
            <h1 className="text-3xl text-white mb-4">Welcome back, { userData.name }</h1>
            <h1 className="text-3xl text-center mb-4 font-bold">Level { userData.level }</h1>
            <div className="w-300px mx-auto mb-20">
              <h2 className="font-bold text-lg">Progress: {calculateProgress()}%</h2>
              <div className="w-full h-20 bg-white overflow-hidden rounded-lg">
                <div
                  className="h-full bg-red-500 transition-width duration-300 ease-in-out border-2 border-black"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
          </div>

          {/* Chat Feed */}
          <div className="flex flex-col justify-between bg-gray-900 w-1/2 p-4 rounded-lg">
            <div className="h-1/2 overflow-auto">
              <div className="flex w-fill justify-center items-center">
                <h1 className="text-white text-3xl">Global Chat</h1>
              </div>
              {messages.map((message, index) => (
                <div key={ index } className="mb-4 bg-slate-500 p-2 rounded-md">
                  <span className="text-gray-400">{ message.timestamp }</span>
                  <p className="text-white">
                    <span className="text-blue-900 font-bold">{ userData.name }:</span> { message.text }
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <input
                type="text"
                value={ newMessage }
                onChange={handleMessageChange}
                placeholder="Type your message..."
                className="w-full p-2 border rounded text-black"
              />
              <button onClick={handleSendMessage} className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* User Stats/Achievements */}
        <div className="w-full bg-black h-1/3 pt-10 rounded-lg flex flex-col">
          <div className="flex flex-row justify-center">
            <div className="h-12 rounded-lg flex flex-col w-1/5 justify-center place-items-center">
              <h1 className="bg-blue-800 text-white text-start font-bold text-3xl mt-40 p-2">Stats</h1>
              <div className="flex flex-col mt-5 text-white text-lg border-2 border-white p-3">
                <h1 className="text-center font-bold text-3xl">Overall</h1>
                <h1>Wins: { userData.wins }</h1>
                <h1>Loses: { userData.loses }</h1>
                <h1>W/L: { userData.wl !== undefined ? parseFloat(userData.wl).toFixed(1) : 'N/A' }</h1>
                <h1>Most Coins: {formatNumberWithCommas(userData.maxCoins)}</h1>
                <h1>Games Played: { userData.totalGamesPlayed }</h1>
              </div>
            </div>
            <div className="h-12 rounded-lg flex flex-col w-4/5 justify-center place-items-center pr-72 pt-12">
              <h1 className="bg-blue-800 text-white text-center font-bold text-3xl mt-6 p-2">Achievement Showcase</h1>
              <div className="flex flex-row mt-5">
                <div className="flex flex-row mt-5">
                  {achievements.length === 0 ? (
                    <h1 className='text-white'>No Achievements</h1>
                  ) : (
                    achievements.map((achievement) => (
                      <div key={ achievement.id } className="flex flex-col items-center mr-4">
                        <img src={ achievement.image.src } alt={ achievement.name } className="h-16 w-16" />
                        <span className="text-white text-center">{ achievement.name }</span>
                        <span className="text-gray-400 text-center">{ achievement.description }</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}