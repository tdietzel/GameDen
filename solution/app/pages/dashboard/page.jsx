'use client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import ChatDashboard from '../../components/ChatDashboard'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.replace('/');
    return null;
  }

  return (
    <>
      <Header />
      <ChatDashboard />
      <Footer />
    </>
  );
}