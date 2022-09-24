import React from 'react'
import {Link} from 'react-router-dom';

export default function Header({isLoggedIn}) {

  return (
    <div className='w-full h-[90px] border-b border-gray-100 fixed top-0 z-50 drop-shadow-xl flex md:flex-row justify-center bg-slate-50 font-robotoMono text-lg'>
        <div className='w-full p-2 flex flex-col justify-center md:w-4/5 md:flex-row md:justify-between md:items-center'>
            <Link to='/'><h1 className="font-arvo text-center text-4xl md:text-6xl">CODE . blog</h1></Link> 
            <div className='p-2 flex justify-center'>
                {isLoggedIn ? <Link to="/logout" className="text-lg mr-6 border-b border-gray-300 hover:border-gray-500">Log Out</Link> : <Link to="/login" className="text-lg mr-6 border-b border-gray-300 hover:border-gray-500">Log In</Link>}
                {!isLoggedIn && <Link to='/signup' className='text-lg border-b border-gray-300 hover:border-gray-500'>Sign Up</Link>}
            </div>
        </div>
    </div>
  )
}
