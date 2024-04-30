// 'use client'
// import React, { useState } from 'react'

// export default function ChatBarBottom() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   const handleMessageChange = (e) => {
//     setNewMessage(e.target.value);
//   };

//   const handleSendMessage = () => {
//     if (newMessage.trim() !== '') {
//       const message = {
//         text: newMessage,
//         timestamp: new Date().toLocaleTimeString(),
//       };
//       setMessages([...messages, message]);
//       setNewMessage('');
//     }
//   };

//   return (
//     <>
//       {/* Chat Feed & User Input */}
//       <div className="flex flex-col h-full">

//         {/* Chat Feed */}
//         <div className="flex-1 overflow-auto bg-black text-white p-4">
//           {messages.map((message, index) => (
//             <div key={ index } className="mb-2">
//               <span className="text-gray-400">{ message.timestamp }</span>
//               <p>{ message.text }</p>
//             </div>
//           ))}
//         </div>
        
//         {/* User Input */}
//         <div className="flex items-center p-4">
//           <input
//             type='text'
//             value={ newMessage }
//             onChange={handleMessageChange}
//             placeholder='Type your message...'
//             className="flex-1 mr-2 p-2 border rounded"
//           />
//           <button onClick={handleSendMessage} className="px-4 py-2 bg-blue-500 text-white rounded">
//             Send
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }