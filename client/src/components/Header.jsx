import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Home</span>
            <span className='text-slate-700'>Profile</span>
        </h1>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-slate-600' size='1.5em'/>
        </form>
        <ul className='flex gap-4'>
            <Link to='/'>
            <li className=' text-slate-700 hover:underline'>Home</li>
            </Link>
            <Link to='/about'>
            <li className=' text-slate-700 hover:underline'>Profile</li>
            </Link>
            <Link to='/signin'>
            <li className=' text-slate-700 hover:underline'>Sign In</li>
            </Link>
            <Link to='/signup'>
            <li className=' text-slate-700 hover:underline'>Sign Up</li>
            </Link>
        </ul>
        </div>
    </header>
  )
}
