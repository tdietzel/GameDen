import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route'
import Footer from './components/Footer'
import HeaderGuest from './components/HeaderGuest'
import Home from './components/Home'

export default async function Index() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/pages/dashboard');

  return (
    <>
      <div className="h-screen bg-black">
        <HeaderGuest />
        <Home />
        <Footer />
      </div>
    </>
  );
}