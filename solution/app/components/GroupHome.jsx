'use client'
import Modal from 'react-modal'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function GroupHome() {
  const [groups, setGroups] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState({ value: 'all', label: 'All Groups' })
  const [selectedGroup, setSelectedGroup] = useState(null)
  const { data: session } = useSession();
  const router = useRouter();
  
  const filterOptions = [
    { value: 'all', label: 'All Groups' },
    { value: 'public', label: 'Public Groups' },
    { value: 'private', label: 'Private Groups' },
  ]

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('api/getGroup')
        const data = await response.json()
        setGroups(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchGroups()
  }, [])

  const filteredGroups = groups.filter((group) => {
    const isPublic = group.isPublic
    const isPrivate = !group.isPublic

    if (filter.value === 'all') {
      return group.name.toLowerCase().includes(search.toLowerCase())
    } else if (filter.value === 'public' && isPublic) {
      return group.name.toLowerCase().includes(search.toLowerCase())
    } else if (filter.value === 'private' && isPrivate) {
      return group.name.toLowerCase().includes(search.toLowerCase())
    }
    return false
  })

  const handleJoinGroup = async (groupId) => {
    try {
      const userEmail = session?.user?.email;
      const response = await fetch('api/joinGroup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupId, userEmail }),
      });

      if (response.ok) {
        router.push('/pages/groups');
        console.log(await response.text());
      } else {
        console.error(await response.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg">
      <h2 className="text-2xl font-bold text-white font-header mb-4">Join A Group</h2>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search for a group..."
          value={ search }
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <Select
          options={ filterOptions }
          value={ filter }
          onChange={setFilter}
          className="text-black"
          classNamePrefix="react-select"
          isSearchable={false}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredGroups.map((group) => (
          <div
            key={ group._id }
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
            onClick={() => setSelectedGroup(group)}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-white">
                <h3 className="text-xl font-header">{ group.name }</h3>
                {group.isPublic ? (
                  <h3 className='text-green-600'>Public</h3>
                ) : (
                  <h3 className='text-yellow-600'>Private</h3>
                )}
              </div>
              <span className="text-white text-center font-bold">
                { group.members.length } / 5 {/* Update later to not be hard-coded! */}
                <span className="block text-sm font-normal text-gray-400">Members</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={selectedGroup !== null}
        onRequestClose={() => setSelectedGroup(null)}
        contentLabel='Group Details'
        className="bg-gray-800 text-white rounded-lg p-8 w-full max-w-2xl mx-auto"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        {selectedGroup && (
          <>
            <h2 className="text-2xl font-bold mb-4">{ selectedGroup.name }</h2>
            <h3 className="text-lg font-bold mb-2">Description</h3>
            <p className="mb-4">{ selectedGroup.description }</p>
            <h3 className="text-lg font-bold mb-2">Members</h3>
            <ul className="mb-4">{ selectedGroup.members.length }</ul>
            <h3 className="text-lg font-bold mb-2">Status</h3>
            {selectedGroup.isPublic ? (
              <>
                <h3 className="text-green-600">Public</h3>
                <div className="flex justify-center">
                  <button
                    className="py-3 px-8 rounded-xl bg-blue-700 hover:border-green-600 hover:border-4"
                    onClick={() => handleJoinGroup(selectedGroup._id)}
                  >
                    Join
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-yellow-600">Private</h3>
                <div className="flex justify-center">
                  <button
                    className="py-3 px-8 rounded-xl bg-orange-600 mr-5"
                    onClick={() => handleApplyToGroup(selectedGroup._id)}
                  >
                    Apply
                  </button>
                  <button
                    className="py-3 px-3 rounded-xl bg-blue-600"
                    onClick={() => handleJoinWithCode(selectedGroup._id)}
                  >
                    Join With Code
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  )
}