import React from 'react'
import {Link} from 'react-router-dom';

export default function Header({isLoggedIn}) {

  return (
    <div className='w-full h-[90px] border-b border-gray-100 fixed top-0 z-50 drop-shadow-xl flex justify-center bg-slate-50 '>
        <div className='w-4/5 p-2 flex justify-between items-center'>
            <Link to='/'><h1 className="font-arvo text-6xl">CODE.</h1></Link> 
            <div className='p-2'>
                {isLoggedIn ? <Link to="/logout" className="text-lg mr-6 border-b border-gray-300 hover:border-gray-500">Log Out</Link> : <Link to="/login" className="text-lg mr-6 border-b border-gray-300 hover:border-gray-500">Log In</Link>}
                {!isLoggedIn && <Link to='/signup' className='text-lg border-b border-gray-300 hover:border-gray-500'>Sign Up</Link>}
            </div>
        </div>
    </div>
  )
}
