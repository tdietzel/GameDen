'use client'
import axios from 'axios'
import { useState } from 'react'

const CreateGroupForm = ({ userId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('api/createGroup', {
        name,
        description,
        isPublic,
        userEmail: userId
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="text-5xl text-center font-bold text-white pt-5">
        Start a group
      </h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-5/6 margin-auto">
          <input
            type='text'
            placeholder='Group Name'
            value={ name }
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <textarea
            placeholder='Description'
            value={ description }
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            rows='3'
          />
          <label className="text-white">
            <input
              type='checkbox'
              value='public'
              checked={ !isPublic }
              onChange={() => setIsPublic(false)}
              className="mr-2"
            />
            Private
          </label>
          <button
            type='submit'
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            Create Group
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateGroupForm;