import Link from 'next/link'
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "./api/auth/[...nextauth]/route"

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/pages/dashboard");

  return (
    <>
    <div className='flex flex-col'>
      <Link href='/pages/login'>Login</Link>
      <Link href='/pages/register'>Register</Link>
    </div>
    </>
  );
}