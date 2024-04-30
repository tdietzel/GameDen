'use client'
import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Settings() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        const res = await fetch('/api/user');
        const data = await res.json();
        setUserData(data);
        setNewUsername(data.name);
        setNewEmail(data.email);
      }
    };
    fetchUserData();
  }, [session]);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const res = await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          screenName: newUsername,
          email: userData.email,
          newEmail: newEmail,
        }),
      });

      if (res.ok) {
        const updatedData = await res.json();
        setUserData(updatedData);
        alert("Changes saved successfully!");
      } else {
        alert("Failed to save changes. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userData.email }),
      });

      if (res.ok) {
        await signOut();
        window.location.href = res.url;
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 font-header">Settings</h1>
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor='username' className="block font-bold mb-2 font-body">
            Username
          </label>
          <input
            type='text'
            id='username'
            value={ newUsername }
            onChange={handleUsernameChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor='email' className="block font-bold mb-2 font-body">
            Email
          </label>
          <input
            type='email'
            id='email'
            value={ newEmail }
            onChange={handleEmailChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSaveChanges}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-bold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
        <button
          onClick={handleDeleteUser}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-bold mt-4 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
