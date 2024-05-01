'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import CreateGroupForm from '../../components/CreateGroupForm'
import CurrentGroup from '../../components/CurrentGroup'
import GroupHome from '../../components/GroupHome'
import Header from '../../components/Header'
import HeaderGuest from '../../components/HeaderGuest'

export default function Groups() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [userData, setUserData] = useState({});
  // const [groupData, setGroupData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userEmail) {
        try {
          const response = await fetch(`/api/user/?email=${userEmail}`);
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [userEmail]);

  return (
    <div className="bg-black h-screen">
      {session ? (
        <>
          <Header />
          {userData.group !== null ? (
            <CurrentGroup />
          ) : (
            <>
              <CreateGroupForm userId={ userEmail } />
              <GroupHome />
            </>
          )}
        </>
      ) : (
        <HeaderGuest />
      )}
    </div>
  );
}

  // const fetchGroupData = async (groupId) => {
  //   try {
  //     console.log('Fetching group data for groupId:', groupId); // Verify the value of groupId
  //     const response = await fetch(`/api/group/${groupId}`);
  //     const data = await response.json();
  //     console.log('Group data:', data);
  //     setGroupData(data);
  //   } catch (error) {
  //     console.error('Error fetching group data:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (userData.group) {
  //     fetchGroupData(userData.group); // Pass the actual groupId directly
  //   }
  // }, [userData.group]);