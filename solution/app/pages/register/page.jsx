import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import HeaderGuest from '../../components/HeaderGuest'
import RegisterForm from '../../components/RegisterForm'

export default async function Register() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/pages/dashboard');
  
  return (
    <>
      <HeaderGuest />
      <RegisterForm />
    </>
  );
}