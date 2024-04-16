import Link from 'next/link'
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "./pages/[...nextauth]/route"

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return (
    <>
    <div className='flex flex-col'>
      <Link href='/login'>Login</Link>
      <Link href='register'>Register</Link>
    </div>
    </>
  );
}