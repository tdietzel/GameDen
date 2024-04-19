import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import LoginForm from '../../components/LoginForm'
import HeaderGuest from '../../components/HeaderGuest'

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/pages/dashboard");

  return (
    <>
      <HeaderGuest />
      <LoginForm />
    </>
  );
}