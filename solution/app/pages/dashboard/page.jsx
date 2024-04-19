'use client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Header from '../../components/Header'
import ChatDashboard from '../../components/ChatDashboard'

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.replace('/');
    return null;
  }

  return (
    <>
      <Header />
      <ChatDashboard />
    </>
  );
}