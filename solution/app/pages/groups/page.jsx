'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import CreateGroupForm from '../../components/CreateGroupForm'
import CurrentGroup from '../../components/CurrentGroup'
import Groups from '../../components/Groups'
import Header from '../../components/Header'
import HeaderGuest from '../../components/HeaderGuest'

export default function GroupsHome() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (userEmail) {
        try {
          const response = await fetch(`/api/user/?email=${ userEmail }`);
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
    <div className="bg-gray-800 h-screen">
      {session ? (
        <>
          <Header />
          {userData.group !== null ? (
            <CurrentGroup />
          ) : (
            <>
              <CreateGroupForm userId={ userEmail } />
              <Groups />
            </>
          )}
        </>
      ) : (
        <>
          <HeaderGuest />
          <Groups />
        </>
      )}
    </div>
  );
}