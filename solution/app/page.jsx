import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route'
import CurrentGames from './components/CurrentGames'
import Footer from './components/Footer'
import HeaderGuest from './components/HeaderGuest'
import HomePage from './components/HomePage'

export default async function Index() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/pages/dashboard');

  return (
    <>
      <div className="h-screen bg-black">
        <HeaderGuest />
        <HomePage />
        <CurrentGames />
        <Footer />
      </div>
    </>
  );
}