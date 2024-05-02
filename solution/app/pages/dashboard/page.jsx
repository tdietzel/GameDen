'use client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Dashboard from '../../components/Dashboard'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function DashboardHome() {
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
    <div className='min-h-screen bg-black'>
      <Header />
      <Dashboard  />
      <Footer />
    </div>
    </>
  );
}