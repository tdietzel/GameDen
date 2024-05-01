import React from 'react'

export default function CurrentGroup() {
  const handleLeaveGroup = async () => {
    try {
      const res = await fetch('/api/leaveGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userData.email }),
      });

      if (res.ok) {
        console.log(await res.text());
      } else {
        console.error("Failed to leave group");
      }
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };

  return (
    <>
      <div className="text-white">
        <h3>CurrentGroup</h3>
        <button onClick={handleLeaveGroup} className="padding-5 bg-white text-black hover:cursor-pointer">Leave Group</button>
      </div>
    </>
  )
}