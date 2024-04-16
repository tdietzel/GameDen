import Link from 'next/link'
export default function RegisterForm() {
  return (
    <>
      <div>
        <h1>Create an account</h1> 
        <form>
          <input type='text'/>
          <button type='submit'>Play Now</button>
        </form>
        <div className='flex flex-col'>
          <Link href='/login'>Sign In</Link>
          <Link href='/'>Home</Link>
        </div>
      </div>
    </>
  )
}