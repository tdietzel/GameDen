import React, { useState } from 'react'
import achievementIMG from '../public/img/achievement.png'

export default function ChatBarDashboard() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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

  return (
    <>
      {/* Dashboard, Chat Feed & User Stats/Achievements */}
      <div className="h-screen flex flex-col bg-blue-400">
        {/* Dashboard & Chat Feed */}
        <div className="flex flex-row h-2/3">
          {/* Dashboard */}
          <div className="w-1/2 h-full p-4 bg-blue-400">
            <h1 className="text-3xl text-white mb-4">Welcome back, Timmy</h1>
            <h1 className="text-3xl text-center mb-4 font-bold">Level 1</h1>
            <div className="w-300px mx-auto mb-20">
              <h2 className="font-bold text-lg">Progress: 39%</h2>
              <div className="w-full h-20 bg-white overflow-hidden rounded-lg">
                <div
                  className="h-full bg-red-500 transition-width duration-300 ease-in-out border-2 border-black"
                  style={{ width: '39%' }}
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
                  <p className="text-white">{ message.text }</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <input
                type='text'
                value={ newMessage }
                onChange={handleMessageChange}
                placeholder='Type your message...'
                className="w-full p-2 border rounded text-black"
              />
              <button onClick={handleSendMessage} className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* User Stats/Achievements */}
        <div className="w-full bg-black h-1/3 pt-8 rounded-lg flex flex-col">
          <div className="flex flex-row justify-center">
            <div className="h-12 rounded-lg flex flex-col w-1/5 justify-center place-items-center">
              <h1 className="bg-blue-800 text-white text-start font-bold text-3xl mt-24 p-2">Stats</h1>
              <div className="flex flex-col mt-5 text-white text-lg border-2 border-white p-3">
                <h1>Wins: 1000</h1>
                <h1>W/L: 3.5</h1>
                <h1>Most Coins: 100,000,000</h1>
                <h1>Games Played: 1,285</h1>
              </div>
            </div>
            <div className="h-12 rounded-lg flex flex-col w-4/5 justify-center place-items-center pr-72">
              <h1 className="bg-blue-800 text-white text-center font-bold text-3xl mt-6 p-2">Achievement Showcase</h1>
              <div className="flex flex-row mt-5">
                <img src={ achievementIMG.src } alt='achievement.png' className="h-16 w-16 mr-5" />
                <img src={ achievementIMG.src } alt='achievement.png' className="h-16 w-16 mr-5" />
                <img src={ achievementIMG.src } alt='achievement.png' className="h-16 w-16 mr-5" />
                <img src={ achievementIMG.src } alt='achievement.png' className="h-16 w-16 mr-5" />
                <img src={ achievementIMG.src } alt='achievement.png' className="h-16 w-16 mr-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}