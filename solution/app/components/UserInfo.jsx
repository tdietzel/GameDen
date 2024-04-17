"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from 'next/link';

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    session ? (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <div>
          <span className="font-bold">{session?.user?.screenName}</span>
          {console.log(session?.user?.email)}
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
    ) :
    (
      <h1><Link href='/register'><b>Register</b></Link> or <Link href='/login'><b>Sign In</b></Link></h1>
    )
  );
}