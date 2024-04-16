import Link from 'next/link'
export default function LoginForm() {
  return (
    <>
      <div>
        <h1>Enter your details</h1> 
        <form>
          <input type='text'/>
          <button type='submit'>Sign In</button>
        </form>
        <div className='flex flex-col'>
          <Link href='/register'>Register an Account</Link>
          <Link href='/'>Home</Link>
        </div>
      </div>
    </>
  )
}