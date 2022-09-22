import React from 'react'
import {Link} from 'react-router-dom';

export default function Header({isLoggedIn}) {

  return (
    <div className='w-full h-[90px] border-b border-gray-100 fixed top-0 z-50 drop-shadow-xl flex justify-center bg-slate-50'>
        <div className='w-full p-6 ml-20 mr-20 flex justify-between'>
            <Link to='/'><h1 className="text-4xl font-semibold hover:border-b hover:border-gray-500">Ben's Blog</h1></Link> 
            <div className='p-2'>
                {isLoggedIn ? <Link to="/logout" className="mr-6 border-b border-gray-300 hover:border-gray-500">Log Out</Link> : <Link to="/login" className="mr-6 border-b border-gray-300 hover:border-gray-500">Log In</Link>}
                {!isLoggedIn && <Link to='/signup' className='border-b border-gray-300 hover:border-gray-500'>Sign Up</Link>}
            </div>
        </div>
    </div>
  )
}
